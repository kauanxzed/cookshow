import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { SharedUtilModule } from '@cook-show/shared/util';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), SharedUtilModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
