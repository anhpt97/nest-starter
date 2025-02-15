import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PORT } from '~/common/constants';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
    });
  }

  async del(key: string) {
    await this.redis.del(key);
  }

  async get(key: string) {
    return await this.redis.get(key);
  }

  async set(key: string, value: string, expTimeInSeconds?: number) {
    await (expTimeInSeconds
      ? this.redis.set(key, value, 'EX', expTimeInSeconds)
      : this.redis.set(key, value));
  }

  async ttl(key: string) {
    return await this.redis.ttl(key);
  }
}
