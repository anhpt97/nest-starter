import { ApiHeader } from '@nestjs/swagger';
import { Locale } from '../enums';

export const ApiAcceptLanguage = () =>
  ApiHeader({
    name: 'Accept-Language',
    enum: Locale,
  });
