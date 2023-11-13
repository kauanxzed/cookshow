import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('/:userId')
  async findById(@Param('userId') userId: string) {
    return await this.userService.findById(userId)
  }

  @Put('/:userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(userId, updateUserDto)
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: string) {
    return await this.userService.delete(userId)
  }

  @Get('/:userId/userInfo')
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
