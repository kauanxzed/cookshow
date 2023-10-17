import { getRepositoryToken } from '@nestjs/typeorm';
import { RatingEntity } from './entities/recipe-rating.entity';
import { RecipeRatingService } from './recipe.rating.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository, SelectQueryBuilder } from 'typeorm';

describe('RecipeRatingService', () => {
  let recipeRatingService: RecipeRatingService;
  let recipeRatingRepository: Repository<RatingEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeRatingService,
        { provide: getRepositoryToken(RatingEntity), useClass: Repository },
      ],
    }).compile();

    recipeRatingService = module.get<RecipeRatingService>(RecipeRatingService);
    recipeRatingRepository = module.get<Repository<RatingEntity>>(
      getRepositoryToken(RatingEntity)
    );
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
        nota: 5,
      } as RatingEntity;

      ratingEntity = {
        ...createRatingDto,
        id: '1',
      } as RatingEntity;
    });

    it('should create a new rating', async () => {
      //Arrange
      jest.spyOn(recipeRatingService, 'create').mockResolvedValueOnce(null);

      jest.spyOn(recipeRatingRepository, 'createQueryBuilder').mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ raw: [ratingEntity] }),
      } as unknown as SelectQueryBuilder<RatingEntity>);
      //Act
      await recipeRatingService.create(ratingEntity);
      //Assert
      expect(recipeRatingRepository.createQueryBuilder).toBeCalledTimes(1);
    });
  });
});
