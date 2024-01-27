import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { REFRESH_TOKEN_TTL } from '~/common/constants';
import { ErrorCode } from '~/common/enums';
import { JwtPayload } from '~/common/models';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private redisService: RedisService,
  ) {}

  create(payload: JwtPayload, requireRefreshToken = true) {
    const accessToken = this.jwtService.sign(payload);
    if (!requireRefreshToken) {
      return { accessToken };
    }
    const refreshToken: string = randomUUID();
    void this.redisService.set(refreshToken, accessToken, REFRESH_TOKEN_TTL);
    return { accessToken, refreshToken };
  }

  async verify(refreshToken: string) {
    const accessToken = await this.redisService.get(refreshToken);
    if (!accessToken) {
      throw new NotFoundException(ErrorCode.TOKEN_NOT_FOUND);
    }
    try {
      return this.jwtService.verify<JwtPayload>(accessToken, {
        ignoreExpiration: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  delete(refreshToken: string) {
    void this.redisService.del(refreshToken);
  }
}
