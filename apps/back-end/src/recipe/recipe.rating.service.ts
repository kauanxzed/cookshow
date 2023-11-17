import { InjectRepository } from '@nestjs/typeorm'
import { RatingEntity } from './entities/recipe-rating.entity'
import { HttpException, Injectable, Inject, HttpStatus } from '@nestjs/common'
import { CreateRecipeRatingDto } from './dto/create-recipe-rating.dto'
import { Repository } from 'typeorm'
import { RecipeService } from './recipe.service'
import { UserService } from '../user/user.service'
import { UpdateRecipeRatingDto } from './dto/update-recipe-rating.dto'

@Injectable()
export class RecipeRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @Inject(RecipeService)
    private readonly recipeService: RecipeService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async create(createRecipeRatingDto: CreateRecipeRatingDto): Promise<void> {
    const recipe = await this.recipeService.findById(
      createRecipeRatingDto.id_receita,
    )

    const user = await this.userService.findById(
      createRecipeRatingDto.id_usuario,
    )

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
    } else if (recipe.publicado === false) {
      throw new HttpException('Recipe not published', HttpStatus.NOT_FOUND)
    }

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    try {
      await this.ratingRepository
        .createQueryBuilder()
        .insert()
        .values({
          usuario: user,
          receita: recipe,
          avaliacao: createRecipeRatingDto.avaliacao,
          favorito: createRecipeRatingDto.favorito,
        })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getById(recipeId: string, userId: string) {
    try {
      const interacted = await this.ratingRepository
        .createQueryBuilder('interaction')
        .where('interaction.id_receita = :recipeId', { recipeId })
        .andWhere('interaction.id_usuario = :userId', { userId })
        .getOne()

      return interacted
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getRating(recipeId: string): Promise<number> {
    const recipe = await this.recipeService.findById(recipeId)

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
    } else if (recipe.publicado === false) {
      throw new HttpException('Recipe not published', HttpStatus.NOT_FOUND)
    }

    try {
      const ratings = await this.ratingRepository
        .createQueryBuilder('rating')
        .where('rating.id_receita = :id_receita', { id_receita: recipeId })
        .getMany()

      if (!ratings) return 0
      const sum = ratings.reduce((acc, rating) => {
        if (!rating.avaliacao) return acc + 0
        return acc + rating.avaliacao
      }, 0)

      return ratings.length > 0 ? sum / ratings.length : 0
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getNumRecipeFavorite(recipeId: string): Promise<number> {
    const favorited = await this.ratingRepository
      .createQueryBuilder('favorites')
      .where('favorites.id_receita = :id', { id: recipeId })
      .andWhere('favorites.favorito')
      .getCount()

    return favorited
  }

  async updateRecipeRating(
    recipeId: string,
    userId: string,
    updateRecipeRatingDto: UpdateRecipeRatingDto,
  ) {
    try {
      const rating = await this.getById(recipeId, userId)
      if (!rating) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
      }

      const updatedRecipe = await this.ratingRepository
        .createQueryBuilder('interaction')
        .update(RatingEntity)
        .set(updateRecipeRatingDto)
        .where('interaction.id_receita = :recipeId', { recipeId })
        .andWhere('interaction.id_usuario = :userId', { userId })
        .execute()

      return updatedRecipe.raw[0]
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
