import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  Put,
  Delete,
} from '@nestjs/common'
import { RecipeService } from './recipe.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CreateRecipeRatingDto } from './dto/create-recipe-rating.dto'
import { RecipeRatingService } from './recipe.rating.service'
import { CreateCommentDto } from './dto/create-recipe-comment.dto'
import { RecipeCommentService } from './recipe.comment.service'
import { UpdateCommentDto } from './dto/update-recipe-comment.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { ApiResponse } from '@nestjs/swagger'
import { UpdateRecipeRatingDto } from './dto/update-recipe-rating.dto'

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly recipeRatingService: RecipeRatingService,
    private readonly commentService: RecipeCommentService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto)
  }

  @Post('/:recipeId/ingredient/:ingredientId')
  @UseGuards(JwtAuthGuard)
  async addRecipeIngredient(
    @Param('recipeId') recipeId: string,
    @Param('ingredientId') ingredientId: number,
    @Body('portion') portion: number,
  ) {
    return await this.recipeService.addRecipeIngredient(
      recipeId,
      ingredientId,
      portion,
    )
  }

  @Get('/:recipeId')
  @ApiResponse({
    status: 200,
    description: '',
    type: CreateRecipeDto,
  })
  async findById(@Param('recipeId') recipeId: string) {
    return await this.recipeService.findById(recipeId)
  }

  @Post('/:recipeId/rating')
  @UseGuards(JwtAuthGuard)
  async createRating(@Body() createRecipeRatingDto: CreateRecipeRatingDto) {
    return await this.recipeRatingService.create(createRecipeRatingDto)
  }

  @Get('/:recipeId/rating')
  async getRating(@Param('recipeId') recipeId: string) {
    return await this.recipeRatingService.getRating(recipeId)
  }

  @Get('/:recipeId/favoritesQuantity')
  async getNumFavoritesRecipe(@Param('recipeId') recipeId: string) {
    return await this.recipeRatingService.getNumRecipeFavorite(recipeId)
  }

  @Get('/user/:userId')
  async getUserRecipes(@Param('userId') userId: string) {
    return await this.recipeService.getUserRecipes(userId)
  }

  @Post('/:recipeId/comment')
  @UseGuards(JwtAuthGuard)
  async(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto)
  }

  @Get('/:recipeId/comment/:id')
  async findCommentById(@Param('id') id: string) {
    return await this.commentService.findById(id)
  }

  @Get('/:recipeId/comment')
  async findAll() {
    return await this.commentService.findAll()
  }

  @Put('/:recipeId/comment/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto)
  }

  @Delete('/:recipeId/comment/:id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id)
  }

  @Get('/search/ingredient')
  async fyndRecipeByIngredients(@Body() idIngredient: { id: number }[]) {
    const ingredientesId = idIngredient.map((ingrediente) => ingrediente.id)
    return await this.recipeService.searchRecipeByIngredient(ingredientesId)
  }

  @Get('/:recipeId/commentsQuantity')
  async getQuantCommentsRecipe(@Param('recipeId') recipeId: string) {
    return await this.commentService.getQuantCommentsRecipe(recipeId)
  }

  @Get('/user/:userId/favorites')
  async getFavoritedRecipes(@Param('userId') userId: string) {
    return await this.recipeService.getFavoritedRecipes(userId)
  }

  @Put('/:recipeId')
  @UseGuards(JwtAuthGuard)
  async updateRecipe(
    @Param('recipeId') recipeId: string,
    @Body() recipe: UpdateRecipeDto,
  ) {
    return await this.recipeService.updateRecipe(recipeId, recipe)
  }

  @Delete('/ingredientRecipe')
  async deleteRecipeIngredient(
    @Param('recipeId') recipeId: string,
    @Body() ingredientId: { id_ingrediente: number },
    @Body() idReceita: { id_receita: string },
  ) {
    return await this.recipeService.deleteRecipeIngredient(
      ingredientId.id_ingrediente,
      idReceita.id_receita,
    )
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteRecipe(@Body('id_receita') recipeId: string) {
    return await this.recipeService.deleteRecipe(recipeId)
  }

  @Get('/:recipeId/user/:userId/interaction')
  async getUserInteracted(
    @Param('recipeId') recipeId: string,
    @Param('userId') userId: string,
  ) {
    return await this.recipeRatingService.getById(recipeId, userId)
  }

  @Put('/:recipeId/user/:userId/rating')
  @UseGuards(JwtAuthGuard)
  async updateRating(
    @Param('recipeId') recipeId: string,
    @Param('userId') userId: string,
    @Body() dto: UpdateRecipeRatingDto,
  ) {
    return await this.recipeRatingService.updateRecipeRating(
      recipeId,
      userId,
      dto,
    )
  }
}
