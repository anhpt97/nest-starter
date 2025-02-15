import { NextFunction, Request, Response } from 'express';
import { use } from 'i18next';
import I18NexFsBackend from 'i18next-fs-backend';
import { join } from 'path';
import { Locale } from '../enums';

const locales = Object.values(Locale);

export const i18n = (req: Request, _: Response, next: NextFunction) => {
  void use(I18NexFsBackend).init({
    backend: {
      loadPath: join(
        process.cwd(),
        'locales',
        `${
          req
            .acceptsLanguages()
            .find((locale: Locale) => locales.includes(locale)) || Locale.En
        }.json`,
      ),
    },
    initImmediate: false,
  });
  next();
};
