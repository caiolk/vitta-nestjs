import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisCacheService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async get(key:string) {
    await this.redis.get(key);
  }

  async set(key:string, value:any ) {
    await this.redis.set(key, value);
  }
}