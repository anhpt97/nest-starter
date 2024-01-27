import { IsInt, IsOptional, Min } from 'class-validator';

export const LIMIT = 'limit';
export const PAGE = 'page';
export const KEYWORD = 'keyword';
export const FILTER = 'filter';
export const SORT = 'sort';

export class PaginationQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  [LIMIT]: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  [PAGE]: number;

  @IsOptional()
  [KEYWORD]: string;

  @IsOptional()
  [FILTER]: Record<string, any>;

  @IsOptional()
  [SORT]: { by: string; direction: 'ASC' | 'DESC' };
}
