import { bgRed } from 'chalk';
import { Request } from 'express';
import { createLogger, format } from 'winston';
import { Console, File } from 'winston/lib/winston/transports';

const logger = createLogger({
  format: format.printf(
    ({ message }) =>
      `${bgRed(new Date().toISOString())} — ${message as string}\n`,
  ),
  transports: [
    new Console(),
    new File({ filename: 'error.log', dirname: 'logs' }),
  ],
});

export const log = (error: Error, req?: Request) =>
  logger.log({
    level: 'error',
    message: JSON.stringify({
      error: JSON.parse(
        JSON.stringify(error, Object.getOwnPropertyNames(error)),
      ),
      request: req && {
        body: req.body,
        headers: { authorization: req.headers?.authorization },
        ip: req.ip,
        method: req.method,
        params: req.params,
        query: req.query,
        url: `${req.headers?.origin || ''}${req.originalUrl || ''}`,
        // @ts-ignore
        user: req.user,
      },
    }),
  });
