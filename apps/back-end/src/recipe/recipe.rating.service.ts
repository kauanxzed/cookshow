import { InjectRepository } from '@nestjs/typeorm';
import { RatingEntity } from './entities/recipe-rating.entity';
import { HttpException, Injectable, Inject, HttpStatus } from '@nestjs/common';
import { CreateRecipeRatingDto } from './dto/create-recipe-rating.dto';
import { Repository } from 'typeorm';
import { RecipeService } from './recipe.service';

@Injectable()
export class RecipeRatingService {
  constructor(
    @InjectRepository(RatingEntity)
    private readonly ratingRepository: Repository<RatingEntity>,
    @Inject(RecipeService)
    private readonly recipeService: RecipeService
  ) {}

  async create(createRecipeRatingDto: CreateRecipeRatingDto): Promise<void> {
    const recipe = await this.recipeService.findById(
      createRecipeRatingDto.id_receita
    );

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    } else if (recipe.publicado === false) {
      throw new HttpException('Recipe not published', HttpStatus.NOT_FOUND);
    }

    try {
      await this.ratingRepository
        .createQueryBuilder()
        .insert()
        .values(createRecipeRatingDto)
        .execute();
    } catch (error) {
      throw new HttpException(error.message, 400);
    }
  }

  async getRating(recipeId: string): Promise<number> {
    const recipe = await this.recipeService.findById(recipeId);

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    } else if (recipe.publicado === false) {
      throw new HttpException('Recipe not published', HttpStatus.NOT_FOUND);
    }

    const rating = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.nota)', 'average')
      .where('rating.id_receita = :id', { id: recipeId })
      .getRawOne();

    return rating.average;
  }
}
