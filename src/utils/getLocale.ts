import { Locale } from '~/common/enums';

const locales = Object.values(Locale);

export const getLocale = (languages: string[]) =>
  (languages as Locale[]).find((locale) => locales.includes(locale)) ||
  Locale.En;
