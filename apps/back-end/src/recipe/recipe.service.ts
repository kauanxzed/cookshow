import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeEntity } from './entities/recipe.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeEntity)
    private readonly recipeRepository: Repository<RecipeEntity>,
    @Inject(IngredientService)
    private readonly ingredientService: IngredientService,
    @Inject(UserService)
    private readonly userService: UserService,
    @InjectRepository(RecipeIngredientEntity)
    private readonly recipeIngredientRepository: Repository<RecipeIngredientEntity>,
  ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
    const foundRecipe = await this.findByTitle(createRecipeDto.titulo);
    if (foundRecipe) {
      throw new BadRequestException('Recipe already exists');
    }

    const user = (await this.userService.findById(
      createRecipeDto.userId,
    )) as UserEntity;

    const recipeEntityDto = {
      ...createRecipeDto,
      user,
    };

    const recipe = this.recipeRepository.create(recipeEntityDto);
    return await this.recipeRepository.save(recipe);
  }

  async findByTitle(title: string): Promise<RecipeEntity | null> {
    const foundRecipe = await this.recipeRepository
      .createQueryBuilder('receita')
      .where('receita.titulo = :titulo', { titulo: title })
      .andWhere('receita.deleted_at IS NULL')
      .getOne();

    return foundRecipe;
  }

  async findById(id: string): Promise<RecipeEntity | null> {
    try {
      const foundRecipe = await this.recipeRepository
        .createQueryBuilder('recipe')
        .leftJoinAndMapMany(
          'recipe.ingredients',
          RecipeIngredientEntity,
          'recipeIngredient',
          'recipeIngredient.recipe = recipe.id',
        )
        .where('recipe.id = :id', { id })
        .andWhere('recipe.deleted_at IS NULL')
        .getOne();

      return foundRecipe;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addRecipeIngredient(
    recipeId: string,
    ingredientId: number,
    ingredientPortion: number,
  ): Promise<void> {
    try {
      const recipe = await this.findById(recipeId);
      if (!recipe) {
        throw new BadRequestException('Recipe not found');
      }

      const ingredient = await this.ingredientService.findById(ingredientId);
      if (!ingredient) {
        throw new BadRequestException('Ingredient not found');
      }

      await this.recipeIngredientRepository
        .createQueryBuilder()
        .insert()
        .values({
          ingredient: ingredient,
          recipe: recipe,
          portion: ingredientPortion,
        })
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
