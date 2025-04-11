import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { PaginationQuery } from '../dto';
import { SortDirection } from '../enums';

export const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
export const DEFAULT_PAGE = 1;
export const DEFAULT_FILTER = {};
export const DEFAULT_SORT = { by: 'id', direction: SortDirection.DESC };

@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  private defaultLimit: number;

  private maxLimit: number;

  private defaultSort: { by: string; direction: SortDirection };

  constructor(
    options?: Partial<{
      defaultLimit: PaginationQuery['limit'];
      maxLimit: PaginationQuery['limit'];
      defaultSort: PaginationQuery['sort'];
    }>,
  ) {
    this.defaultLimit = options?.defaultLimit || DEFAULT_LIMIT;
    this.maxLimit = options?.maxLimit || MAX_LIMIT;
    this.defaultSort = options?.defaultSort || DEFAULT_SORT;
  }

  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest<{ query: PaginationQuery }>();
    const { limit, page, filter, sort: _sort } = req.query;

    req.query.limit = Math.min(
      Number(limit) || this.defaultLimit,
      this.maxLimit,
    );

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
          : this.defaultSort;
    } catch {
      req.query.sort = this.defaultSort;
    }

    return next.handle();
  }
}
