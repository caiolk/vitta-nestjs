import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisCacheService } from './rediscache.service';
import { config } from 'dotenv';

@Module({
  imports: [RedisModule.forRootAsync({
    useFactory: () => ({
      config: { 
        host: 'redis',
        port: 6379
      },
    }),
  })],
  providers: [RedisCacheService],
  exports: [RedisCacheService]
})
export class RedisCacheModule {}