import { Locale } from '~/common/enums';
import { getLocale } from './getLocale';

export const getColumnNameSuffix = (languages: string[]) => {
  const locale = getLocale(languages);
  return locale === Locale.EN_US
    ? ''
    : `${locale[0].toUpperCase()}${locale
        .slice(1, -1)
        .replace('-', '')}${locale[locale.length - 1].toLowerCase()}`;
};
