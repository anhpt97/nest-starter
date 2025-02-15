export class PaginatedDto<T> {
  items: T[];

  total: number;

  constructor(items: T[] = [], total = 0) {
    return { items, total };
  }
}
