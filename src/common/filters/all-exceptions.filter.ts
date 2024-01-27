import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { t } from 'i18next';
import { Logger, createLogger, format } from 'winston';
import { File } from 'winston/lib/winston/transports';
import { NODE_ENV } from '../constants';
import { ErrorCode, NodeEnv } from '../enums';
import { Response, ValidationError } from '../models';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      format: format.printf(
        ({ message }) => `${new Date().toISOString()} — ${message}`,
      ),
      transports: new File({ filename: 'error.log', dirname: 'logs' }),
    });
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<ExpressRequest>();
    const res = ctx.getResponse<ExpressResponse>();

    if (
      exception instanceof HttpException &&
      !(exception instanceof InternalServerErrorException)
    ) {
      const response = exception.getResponse() as HttpExceptionBody;
      res.status(exception.getStatus()).json(
        (Array.isArray(response.message)
          ? {
              error: {
                code: ErrorCode.INVALID_INPUT,
                message: t(ErrorCode.INVALID_INPUT),
                details: this.transformErrorMessages(response.message),
              },
            }
          : {
              error: {
                code: response.message,
                message: t(response.message),
                details: [],
              },
            }) as Response,
      );
      return;
    }

    this.log({ error: exception, request: req });

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      (NODE_ENV === NodeEnv.PRODUCTION
        ? {
            error: {
              code: ErrorCode.INTERNAL_SERVER_ERROR,
              message: t(ErrorCode.INTERNAL_SERVER_ERROR),
              details: [],
            },
          }
        : typeof exception.getResponse === 'function'
          ? { error: exception.getResponse() }
          : {
              error: { ...exception, message: exception.toString() },
            }) as Response,
    );
  }

  private log({
    error,
    request: {
      headers: { authorization, origin },
      ip,
      body,
      method,
      params,
      query,
      originalUrl,
      user,
    },
  }: {
    error: Error;
    request: ExpressRequest;
  }) {
    this.logger.log({
      level: 'error',
      message: JSON.stringify({
        error: JSON.parse(
          JSON.stringify(error, Object.getOwnPropertyNames(error)),
        ),
        request: {
          body,
          headers: { authorization },
          ip,
          method,
          params,
          query,
          url: `${origin}${originalUrl}`,
          user,
        },
      }),
    });
  }

  private transformErrorMessages(messages: string[]): ValidationError[] {
    return messages.map((message) => {
      message = message.replace(/(\.)(0|[1-9]\d*)(\.|$)/g, '[$2]$3');
      if (message.includes('each value in ')) {
        message = message.replace(/each value in (nested property )?/, '');
        return {
          field: message.split(' ')[0],
          message: `each value in ${message}`,
        };
      }
      return { field: message.split(' ')[0], message };
    });
  }
}
