import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

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
}
