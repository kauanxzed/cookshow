import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { SharedUtilServer } from '@cook-show/shared/util-server'
import { UpdateUserDto } from './dto/update-user.dto'
import { RatingEntity } from '../recipe/entities/recipe-rating.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sharedUtilServer: SharedUtilServer,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const emailExist = await this.findByEmail(createUserDto.email)

    if (emailExist) {
      throw new HttpException('Email already used', HttpStatus.FORBIDDEN)
    }

    try {
      createUserDto.senha = await this.sharedUtilServer.hash(
        createUserDto.senha,
      )
      const user = await this.userRepository
        .createQueryBuilder()
        .insert()
        .values(createUserDto)
        .execute()
      return user.raw[0]
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundedUser = await this.userRepository
      .createQueryBuilder('usuario')
      .where('usuario.email = :email', { email })
      .andWhere('usuario.deleted_at IS NULL')
      .getOne()

    return foundedUser
  }

  async findById(id: string): Promise<UserEntity | null> {
    const foundUser = await this.userRepository
      .createQueryBuilder('usuario')
      .where('usuario.id = :id', { id })
      .andWhere('usuario.deleted_at IS NULL')
      .getOne()

    return foundUser
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | null> {
    const user = await this.findById(id)

    if (!user) {
      throw new HttpException('User not found', 404)
    }

    if (updateUserDto.email) {
      const emailExist = await this.findByEmail(updateUserDto.email)
      if (emailExist) {
        throw new HttpException('Email already used', HttpStatus.FORBIDDEN)
      }
    }

    try {
      if (updateUserDto.senha) {
        updateUserDto.senha = await this.sharedUtilServer.hash(
          updateUserDto.senha,
        )
      }

      await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set(updateUserDto)
        .where('id = :id', { id })
        .execute()

      return await this.findById(id)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    try {
      await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set({ deleted_at: new Date() })
        .where('id = :id', { id })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getUserInfo(id: string): Promise<UserEntity | null> {
    const user = await this.findById(id)

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    try {
      const userInfo = await this.userRepository
        .createQueryBuilder('usuario')
        .select(['usuario.id', 'usuario.foto_perfil']) // Seleciona o ID e a foto_perfil do usuário
        .where('usuario.id = :id', { id })
        .andWhere('usuario.deleted_at IS NULL')
        .getOne()

      return userInfo
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getRecipeFavoitedByUser(
    userId: string,
    recipeId: string,
  ): Promise<boolean> {
    const foundRecipe = await this.userRepository
      .createQueryBuilder('usuario')
      .leftJoin('usuario.ratings', 'ri')
      .where('ri.favorito = true')
      .andWhere('ri.id_receita = :recipeId', { recipeId: recipeId })
      .andWhere('usuario.id = :userId', { userId: userId })
      .getOne()

    return foundRecipe ? true : false
  }
}
