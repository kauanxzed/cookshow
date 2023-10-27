import { getRepositoryToken } from '@nestjs/typeorm';
import { RatingEntity } from './entities/recipe-rating.entity';
import { RecipeRatingService } from './recipe.rating.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './entities/recipe.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import {
  SharedUtilServer,
  SharedUtilServerImpl,
} from '@cook-show/shared/util-server';
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';
import { RecipeController } from './recipe.controller';

describe('RecipeRatingService', () => {
  let recipeRatingService: RecipeRatingService;
  let recipeRatingRepository: Repository<RatingEntity>;
  let recipeService: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        RecipeRatingService,
        { provide: getRepositoryToken(RatingEntity), useClass: Repository },
        { provide: getRepositoryToken(RecipeEntity), useClass: Repository },
        { provide: getRepositoryToken(IngredientEntity), useClass: Repository },
        { provide: getRepositoryToken(UserEntity), useClass: Repository },
        {
          provide: getRepositoryToken(RecipeIngredientEntity),
          useClass: Repository,
        },
        { provide: SharedUtilServer, useClass: SharedUtilServerImpl },
        UserService,
        IngredientService,
        RecipeService,
      ],
    }).compile();

    recipeRatingService = module.get<RecipeRatingService>(RecipeRatingService);
    recipeRatingRepository = module.get<Repository<RatingEntity>>(
      getRepositoryToken(RatingEntity)
    );
    recipeService = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(recipeRatingService).toBeDefined();
    expect(recipeRatingRepository).toBeDefined();
  });

  describe('create', () => {
    let ratingEntity: RatingEntity;
    let createRatingDto: RatingEntity;

    beforeEach(async () => {
      createRatingDto = {
        id_usuario: '1',
        id_receita: '1',
        avaliacao: 5,
      } as RatingEntity;

      ratingEntity = {
        ...createRatingDto,
        id: '1',
      } as RatingEntity;
    });

    it('should create a new rating', async () => {
      //Arrange
      jest.spyOn(recipeRatingRepository, 'createQueryBuilder').mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ raw: [ratingEntity] }),
      } as unknown as SelectQueryBuilder<RatingEntity>);

      jest.spyOn(recipeService, 'findById').mockResolvedValueOnce({
        id: '1',
        publicado: true,
      } as RecipeEntity);
      //Act
      await recipeRatingService.create(ratingEntity);
      //Assert
      expect(recipeRatingRepository.createQueryBuilder).toBeCalledTimes(1);
    });
  });
});
