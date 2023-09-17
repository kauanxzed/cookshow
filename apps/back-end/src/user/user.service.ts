import { Injectable } from '@nestjs/common';
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
    private sharedUtilServer: SharedUtilServer
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.senha = await this.sharedUtilServer.hash(createUserDto.senha);
    const createdUser = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(createdUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const foundUser = await this.userRepository
      .createQueryBuilder('usuario')
      .where('usuario.id = :id', { id })
      .getOne();

    return foundUser;
  }
}
