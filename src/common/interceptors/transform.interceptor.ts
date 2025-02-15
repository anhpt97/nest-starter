import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs';
import { Response } from '../models';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map<any, Response>((data) => {
        try {
          return data === undefined
            ? { data: true }
            : instanceToPlain({ data });
        } catch {
          return data;
        }
      }),
    );
  }
}
