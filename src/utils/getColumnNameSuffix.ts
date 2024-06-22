import { Locale } from '~/common/enums';
import { getLocale } from './getLocale';

export const getColumnNameSuffix = (languages: string[]) => {
  const locale = getLocale(languages);
  return locale === Locale.En
    ? ''
    : `${locale[0].toUpperCase()}${locale.slice(1)}`;
};
