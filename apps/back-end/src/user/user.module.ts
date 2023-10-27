import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SharedUtilServer } from '@cook-show/shared/util-server';
import { SharedUtilServerImpl } from '@cook-show/shared/util-server';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: SharedUtilServer,
      useClass: SharedUtilServerImpl,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
