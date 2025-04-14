import { Transform } from 'class-transformer';

export const ConvertToArray = () =>
  Transform(({ value }) => (Array.isArray(value) ? value : [value]));
