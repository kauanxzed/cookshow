import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('/:userId')
  @ApiParam({
    name: 'userId',
    description: 'The uuid of the user',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  async findById(@Param('userId') userId: string) {
    return await this.userService.findById(userId)
  }

  @Put('/:userId')
  @ApiParam({
    name: 'userId',
    description: 'The uuid of the user',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      update: {
        value: {
          usuario: 'Admin',
          email: 'teste@teste.com',
          senha: 'Abc123!@#',
          fotoperfil: 'https://www.google.com.br',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Recurso não encontrado' })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto)
  }

  @Delete('/:userId')
  @ApiParam({
    name: 'userId',
    description: 'The uuid of the user',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async delete(@Param('userId') userId: string) {
    return await this.userService.delete(userId)
  }

  @Post('/deleteFoto')
  async deleteFoto(@Body() foto: { userId: string; fotoId: string }) {
    return await this.userService.deleteFoto(foto.userId, foto.fotoId)
  }

  @Get('/:userId/userInfo')
  @ApiParam({
    name: 'userId',
    description: 'The uuid of the user',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiResponse({
    status: 200,
    description:
      'The record has been successfully found the Id and profile picture.',
  })
  async getUserInfo(@Param('userId') userId: string) {
    return await this.userService.getUserInfo(userId)
  }

  @Get('/:userId/:recipeId')
  async getRecipeFavoited(
    @Param('userId') userId: string,
    @Param('recipeId') recipeId: string,
  ) {
    return await this.userService.getRecipeFavoitedByUser(userId, recipeId)
  }
}
