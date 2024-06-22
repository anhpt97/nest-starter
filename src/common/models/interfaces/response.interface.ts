import { Error } from '../error.model';

export interface Response<T = any> {
  data: T;

  error: Error;
}
