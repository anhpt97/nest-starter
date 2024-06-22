import { NextFunction, Request, Response } from 'express';
import { use } from 'i18next';
import I18NexFsBackend from 'i18next-fs-backend';
import { join } from 'path';
import { getLocale } from '~/utils';

export const i18n = (req: Request, _: Response, next: NextFunction) => {
  void use(I18NexFsBackend).init({
    backend: {
      loadPath: join(
        process.cwd(),
        'locales',
        `${getLocale(req.acceptsLanguages())}.json`,
      ),
    },
    initImmediate: false,
  });
  next();
};
