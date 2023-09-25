import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.ingredientService.create(createIngredientDto);
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    return await this.ingredientService.findByName(name);
  }

  @Get()
  async findAll() {
    return await this.ingredientService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateIngredientDto: UpdateIngredientDto
  ) {
    return await this.ingredientService.update(id, updateIngredientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.ingredientService.delete(id);
  }
}
