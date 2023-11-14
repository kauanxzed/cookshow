import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { RecipeEntity } from './entities/recipe.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { UserService } from '../user/user.service'
import { UserEntity } from '../user/entities/user.entity'
import { IngredientService } from '../ingredient/ingredient.service'
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity'
import { IngredientEntity } from '../ingredient/entities/ingredient.entity'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import cloudinary from '../util/cloudinary'

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
    const foundRecipe = await this.findByTitle(createRecipeDto.titulo)
    if (foundRecipe) {
      throw new HttpException('Recipe already exists', HttpStatus.FORBIDDEN)
    }

    const result = await cloudinary.uploader.upload(createRecipeDto.imagem, {
      folder: 'recipes',
    })
    createRecipeDto.imagem = result.url

    const user = (await this.userService.findById(
      createRecipeDto.userId,
    )) as UserEntity

    const recipeEntityDto = {
      ...createRecipeDto,
      ...{ imagem_id: result.public_id },
      user,
    }

    try {
      const recipe = await this.recipeRepository
        .createQueryBuilder()
        .insert()
        .values(recipeEntityDto)
        .execute()

      return recipe.raw[0]
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findByTitle(title: string): Promise<RecipeEntity | null> {
    const foundRecipe = await this.recipeRepository
      .createQueryBuilder('receita')
      .where('receita.titulo = :titulo', { titulo: title })
      .andWhere('receita.deleted_at IS NULL')
      .getOne()

    return foundRecipe
  }

  async findById(id: string): Promise<RecipeEntity | null> {
    const foundRecipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndMapMany(
        'recipe.ingredients',
        RecipeIngredientEntity,
        'recipeIngredient',
        'recipeIngredient.recipe = recipe.id',
      )
      .leftJoin('recipe.user', 'user')
      .addSelect(['user.id', 'user.foto_perfil'])
      .where('recipe.id = :id', { id })
      .andWhere('recipe.deleted_at IS NULL')
      .getOne()

    return foundRecipe
  }

  async isIngredientInRecipe(
    recipe: RecipeEntity,
    ingredient: IngredientEntity,
  ): Promise<boolean> {
    recipe.ingredients.find(
      (recipeIngredient) =>
        Number(recipeIngredient.ingredient) === ingredient.id,
    )
    if (recipe.ingredients.length === 0) return false
    return true
  }

  async addRecipeIngredient(
    recipeId: string,
    ingredientId: number,
    ingredientPortion: number,
  ): Promise<void> {
    try {
      const recipe = await this.findById(recipeId)
      if (!recipe) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
      }

      const ingredient = await this.ingredientService.findById(ingredientId)
      if (!ingredient) {
        throw new HttpException('Ingredient not found', HttpStatus.NOT_FOUND)
      }

      await this.recipeIngredientRepository
        .createQueryBuilder()
        .insert()
        .values({
          ingredient: ingredient,
          recipe: recipe,
          portion: ingredientPortion,
        })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getUserRecipes(userId: string): Promise<RecipeEntity[]> {
    try {
      const allRecipes = await this.recipeRepository
        .createQueryBuilder('recipe')
        .where('recipe.id_usuario = :userId', { userId })
        .andWhere('recipe.deleted_at IS NULL')
        .getMany()

      return allRecipes
    } catch (erro) {
      throw new HttpException(erro.message, HttpStatus.BAD_REQUEST)
    }
  }

  async searchRecipeByIngredient(ingredientId: number[]): Promise<any> {
    const foundRecipes = await this.recipeRepository
      .createQueryBuilder('receita')
      .distinct()
      .innerJoin('receita_ingredientes', 'ri', 'receita.id = ri.id_receita')
      .innerJoin(
        (subQuery) => {
          return subQuery
            .select('id')
            .from('ingredientes', 'ingredientes')
            .where('id IN (:...id)', {
              id: ingredientId,
            })
        },
        'ig',
        'ig.id = ri.id_ingrediente',
      )
      .getMany()

    return foundRecipes
  }

  async getFavoritedRecipes(userId: string): Promise<RecipeEntity[]> {
    try {
      const recipes = await this.recipeRepository
        .createQueryBuilder('recipe')
        .innerJoin('recipe.ratings', 'interacao')
        .where('interacao.id_usuario = :userId', { userId })
        .andWhere('recipe.deleted_at IS NULL')
        .getMany()

      return recipes
    } catch (erro) {
      throw new HttpException(erro.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updateRecipe(
    recipeId: string,
    recipe: UpdateRecipeDto,
  ): Promise<RecipeEntity> {
    try {
      const recipeToUpdate = await this.findById(recipeId)
      if (!recipeToUpdate) {
        throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
      }

      const updatedRecipe = await this.recipeRepository
        .createQueryBuilder()
        .update(RecipeEntity)
        .set(recipe)
        .where('id = :id', { id: recipeId })
        .execute()

      return updatedRecipe.raw[0]
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteRecipeIngredient(
    ingredientId: number,
    recipeId: string,
  ): Promise<void> {
    const foundRecipeIngredient = await this.findById(recipeId)

    if (!foundRecipeIngredient) {
      throw new HttpException(
        'Recipe ingredient not found',
        HttpStatus.NOT_FOUND,
      )
    }

    try {
      await this.recipeIngredientRepository
        .createQueryBuilder()
        .delete()
        .from(RecipeIngredientEntity)
        .where('id_ingrediente = :ingredientId', { ingredientId })
        .andWhere('id_receita = :recipeId', { recipeId })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async deleteRecipe(recipeId: string): Promise<void> {
    const foundRecipe = await this.findById(recipeId)

    if (!foundRecipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND)
    }

    try {
      await this.recipeRepository
        .createQueryBuilder()
        .update(RecipeEntity)
        .set({ deleted_at: new Date() })
        .where('id = :id', { id: recipeId })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }
}
