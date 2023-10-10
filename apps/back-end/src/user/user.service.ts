import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SharedUtilServer } from '@cook-show/shared/util-server';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sharedUtilServer: SharedUtilServer
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const emailExist = await this.findByEmail(createUserDto.email);

    if (emailExist) {
      throw new HttpException('Email already used', 400);
    }

    createUserDto.senha = await this.sharedUtilServer.hash(createUserDto.senha);
    const createdUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(createUserDto)
      .execute();

    return createdUser.raw;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundedUser = await this.userRepository
      .createQueryBuilder('usuario')
      .where('usuario.email = :email', { email })
      .andWhere('usuario.deleted_at IS NULL')
      .getOne();

    return foundedUser;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const foundUser = await this.userRepository
      .createQueryBuilder('usuario')
      .where('usuario.id = :id', { id })
      .getOne();

    return foundUser;
  }
}
