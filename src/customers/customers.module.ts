import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../redis/rediscache.module';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';


@Module({
  imports: [RedisCacheModule],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
