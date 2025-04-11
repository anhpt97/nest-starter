export class PaginatedDto<T> {
  results: T[];

  total: number;

  constructor({ results, total }: { results: T[]; total: number }) {
    this.results = results;
    this.total = total;
  }
}
