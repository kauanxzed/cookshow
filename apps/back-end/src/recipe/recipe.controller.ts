import { Controller, Post, Body, Param, Get, UseGuards } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateRecipeRatingDto } from './dto/create-recipe-rating.dto';
import { RecipeRatingService } from './recipe.rating.service';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly recipeRatingService: RecipeRatingService
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Post('/:recipeId/ingredient/:ingredientId')
  @UseGuards(JwtAuthGuard)
  async addRecipeIngredient(
    @Param('recipeId') recipeId: string,
    @Param('ingredientId') ingredientId: number,
    @Body('portion') portion: number
  ) {
    return await this.recipeService.addRecipeIngredient(
      recipeId,
      ingredientId,
      portion
    );
  }

  @Get('/:recipeId')
  async findById(@Param('recipeId') recipeId: string) {
    return await this.recipeService.findById(recipeId);
  }

  @Post('/:recipeId/rating')
  // @UseGuards(JwtAuthGuard)
  async createRating(@Body() createRecipeRatingDto: CreateRecipeRatingDto) {
    return await this.recipeRatingService.create(createRecipeRatingDto);
  }

  @Get('/:recipeId/rating')
  async getRating(@Param('recipeId') recipeId: string) {
    return await this.recipeRatingService.getRating(recipeId);
  }
}
