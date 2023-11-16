import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { IngredientService } from './ingredient.service'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto)
  }

  @Get(':name')
  @ApiParam({
    name: 'name',
    description: 'The name of the ingredient',
    example: 'Banana',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  async findByName(@Param('name') name: string) {
    return await this.ingredientService.findByName(name)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  async findAll() {
    return await this.ingredientService.findAll()
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the ingredient',
    example: '1',
  })
  @ApiBody({
    type: UpdateIngredientDto,
    examples: {
      update: {
        value: {
          nome: 'Banana',
          calorias: 200,
          carboidratos: 100,
          proteinas: 50,
          gordura: 3,
          porcao: 8,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return await this.ingredientService.update(id, updateIngredientDto)
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    description: 'The id of the ingredient',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  async delete(@Param('id') id: number) {
    return await this.ingredientService.delete(id)
  }

  @Get(':id/getById')
  @ApiParam({
    name: 'id',
    description: 'The id of the ingredient',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'record has been found.',
  })
  async findById(@Param('id') id: number) {
    return await this.ingredientService.findById(id)
  }
}
