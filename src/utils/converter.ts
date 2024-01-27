import { Transform } from 'class-transformer';

export const ConvertToNumber = () => Transform(({ value }) => Number(value));
