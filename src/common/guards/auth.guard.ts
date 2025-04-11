import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { ErrorCode } from '../enums';
import { JwtPayload } from '../models';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest<Request>();
    try {
      req.user = this.jwtService.verify<JwtPayload>(
        req.headers.authorization!.replace('Bearer ', ''),
      );
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(ErrorCode.EXPIRED_TOKEN);
      }
      throw new UnauthorizedException(ErrorCode.INVALID_TOKEN);
    }
    return true;
  }
}
