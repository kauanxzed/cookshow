import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import {
  SharedUtilServer,
  SharedUtilServerImpl,
} from '@cook-show/shared/util-server';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: SharedUtilServer,
      useClass: SharedUtilServerImpl,
    },
    JwtStrategy,
  ],
  exports: [AuthModule],
})
export class AuthModule {}
