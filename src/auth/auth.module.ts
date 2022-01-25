import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
