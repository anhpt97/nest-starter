import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators';
import { ErrorCode, UserRole } from '../enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext) {
    const { user } = ctx.switchToHttp().getRequest<Request>();
    if (!user) {
      throw new InternalServerErrorException(ErrorCode.MISSING_JWT_VALIDATION);
    }
    const roles =
      this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
        ctx.getHandler(),
        ctx.getClass(),
      ]) || [];
    if (!roles.includes(user.role)) {
      throw new ForbiddenException(ErrorCode.PERMISSION_DENIED);
    }
    return true;
  }
}
