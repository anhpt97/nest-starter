import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { PaginationQuery } from '../dto';
import { SortDirection } from '../enums';

export const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
export const DEFAULT_PAGE = 1;
export const DEFAULT_FILTER = {};
export const DEFAULT_SORT = { by: 'id', direction: SortDirection.DESC };

export const paginate = (
  options?: Partial<{
    defaultLimit: PaginationQuery['limit'];
    maxLimit: PaginationQuery['limit'];
    defaultSort: PaginationQuery['sort'];
  }>,
) => {
  const defaultLimit = options?.defaultLimit || DEFAULT_LIMIT;
  const maxLimit = options?.maxLimit || MAX_LIMIT;
  const defaultSort = options?.defaultSort || DEFAULT_SORT;

  @Injectable()
  class PaginationMiddleware implements NestMiddleware {
    // constructor(/* public */) {}

    use(req: { query: PaginationQuery }, _: Response, next: NextFunction) {
      const { limit, page, filter, sort: _sort } = req.query;

      req.query.limit = Math.min(Number(limit) || defaultLimit, maxLimit);

      req.query.page = Number(page) || DEFAULT_PAGE;

      try {
        req.query.filter = JSON.parse(decodeURIComponent(filter as any));
      } catch {
        req.query.filter = DEFAULT_FILTER;
      }

      try {
        const sort: typeof _sort = JSON.parse(_sort as any);
        req.query.sort =
          sort.by &&
          Object.values(SortDirection).includes(
            sort.direction.trim().toUpperCase() as SortDirection,
          )
            ? sort
            : defaultSort;
      } catch {
        req.query.sort = defaultSort;
      }

      next();
    }
  }

  return PaginationMiddleware;
};
