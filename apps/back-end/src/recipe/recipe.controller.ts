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
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly recipeRatingService: RecipeRatingService,
    private readonly commentService: RecipeCommentService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto)
  }

  @Post('/:recipeId/ingredient/:ingredientId')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiParam({
    name: 'ingredientId',
    description: 'The id of the ingredient',
    example: 1,
  })
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
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async findById(@Param('recipeId') recipeId: string) {
    return await this.recipeService.findById(recipeId)
  }

  @Post('/:recipeId/rating')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiBody({
    type: CreateRecipeRatingDto,
    examples: {
      update: {
        value: {
          id_usuario: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
          id_receita: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
          avaliacao: 5,
          favorito: true,
        },
      },
    },
  })
  async createRating(@Body() createRecipeRatingDto: CreateRecipeRatingDto) {
    return await this.recipeRatingService.create(createRecipeRatingDto)
  }

  @Get('/:recipeId/rating')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async getRating(@Param('recipeId') recipeId: string) {
    return await this.recipeRatingService.getRating(recipeId)
  }

  @Get('/:recipeId/favoritesQuantity')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async getNumFavoritesRecipe(@Param('recipeId') recipeId: string) {
    return await this.recipeRatingService.getNumRecipeFavorite(recipeId)
  }

  @Get('/user/:userId')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The uuid of the user',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async getUserRecipes(@Param('userId') userId: string) {
    return await this.recipeService.getUserRecipes(userId)
  }

  @Post('/:recipeId/comment')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiBody({
    type: CreateCommentDto,
    examples: {
      update: {
        value: {
          id_usuario: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
          id_receita: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
          mensagem: 'Muito bom',
        },
      },
    },
  })
  async(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto)
  }

  @Get('/:recipeId/comment/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiParam({
    name: 'id',
    description: 'The uuid of the comment',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async findCommentById(@Param('id') id: string) {
    return await this.commentService.findById(id)
  }

  @Get('/:recipeId/comment')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async findAll() {
    return await this.commentService.findAll()
  }

  @Put('/:recipeId/comment/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  @ApiBody({
    type: UpdateCommentDto,
    examples: {
      update: {
        value: {
          id_usuario: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
          id_receita: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
          mensagem: 'Muito bom',
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.update(id, updateCommentDto)
  }

  @Delete('/:recipeId/comment/:id')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The uuid of the recipe',
    example: '1',
  })
  async delete(@Param('id') id: string) {
    return await this.commentService.delete(id)
  }

  @Post('/search/ingredient')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  async findRecipeByIngredients(@Body() idIngredient: { id: number }[]) {
    console.log(idIngredient)
    const ingredientesId = idIngredient.map((ingrediente) => ingrediente.id)
    return await this.recipeService.searchRecipeByIngredient(ingredientesId)
  }

  @Get('/:recipeId/commentsQuantity')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The id of the recipe',
    example: '1',
  })
  async getQuantCommentsRecipe(@Param('recipeId') recipeId: string) {
    return await this.commentService.getQuantCommentsRecipe(recipeId)
  }

  @Get('/user/:userId/favorites')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully found.',
  })
  @ApiParam({
    name: 'userId',
    description: 'The uuid of the user',
    example: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
  })
  async getFavoritedRecipes(@Param('userId') userId: string) {
    return await this.recipeService.getFavoritedRecipes(userId)
  }

  @Put('/:recipeId')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The id of the recipe',
    example: '1',
  })
  @ApiBody({
    type: UpdateRecipeDto,
    examples: {
      update: {
        value: {
          titulo: 'Bolo de banana',
          subtitulo: 'Bolo de banana com aveia',
          descricao: 'O melhor bolo de banana',
          dificuldade: 'Fácil',
          calorias: 200,
          imagem: 'https://www.google.com.br',
          userId: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
        },
      },
    },
  })
  async updateRecipe(
    @Param('recipeId') recipeId: string,
    @Body() recipe: UpdateRecipeDto,
  ) {
    return await this.recipeService.updateRecipe(recipeId, recipe)
  }

  @Post('/ingredientRecipe')
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiParam({
    name: 'recipeId',
    description: 'The id of the recipe',
    example: '1',
  })
  @ApiBody({
    type: UpdateRecipeDto,
    examples: {
      update: {
        value: {
          id_ingrediente: 1,
          id_receita: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
        },
      },
    },
  })
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
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiBody({
    type: UpdateRecipeDto,
    examples: {
      update: {
        value: {
          id_receita: '73de5d0f-df78-4ca4-a499-ec679125ad9a',
        },
      },
    },
  })
  async deleteRecipe(@Body('id_receita') recipeId: string) {
    return await this.recipeService.deleteRecipe(recipeId)
  }
}
