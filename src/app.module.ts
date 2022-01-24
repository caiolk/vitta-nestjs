import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AuthMiddleware } from './auth.middleware';
import { CustomersController } from './customers/customers.controller';
import { CustomersModule } from './customers/customers.module';
import { CustomersService } from './customers/customers.service';
import { RedisCacheModule } from './redis/rediscache.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env`, isGlobal: true, }), RedisCacheModule, CustomersModule],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class AppModule {
  configure( consumer: MiddlewareConsumer ){
    consumer
      .apply(AuthMiddleware)
      .forRoutes(CustomersController);
  }
}
