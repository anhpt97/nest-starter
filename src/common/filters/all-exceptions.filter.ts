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
import { log } from '~/utils';
import { NODE_ENV } from '../constants';
import { ErrorCode, NodeEnv } from '../enums';
import { Response, ValidationError } from '../models';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
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
                details: this.handleErrorMessages(response.message),
              },
            }
          : {
              error: {
                code: response.message,
                message: t(response.message as string),
                details: [],
              },
            }) as Response,
      );
      return;
    }

    log(exception, req);

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
      (NODE_ENV === NodeEnv.Production
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
              error: {
                code: ErrorCode.INTERNAL_SERVER_ERROR,
                ...exception,
                message: exception.toString(),
              },
            }) as Response,
    );
  }

  private handleErrorMessages(messages: string[]): ValidationError[] {
    return messages.map((message) => {
      const isArrayField = message.includes('each value in');
      const [_field, ...rest] = (
        isArrayField
          ? message.replace(/each value in (nested property )?/, '')
          : message
      ).split(' ');
      const field = _field.replace(/\.(\d+)/g, '[$1]');
      return {
        field,
        message: `${isArrayField ? 'each value in ' : ''}${field} ${rest.join(' ')}`,
      };
    });
  }
}
