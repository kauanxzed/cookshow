import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { RecipeEntity } from './entities/recipe.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { SharedUtilServer } from '@cook-show/shared/util-server';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { IngredientService } from '../ingredient/ingredient.service';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let userService: UserService;
  let ingredientService: IngredientService;
  let recipeRepository: Repository<RecipeEntity>;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SharedUtilServer,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        RecipeService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: Repository,
        },
        IngredientService,
      ],
    }).compile();

    recipeService = module.get<RecipeService>(RecipeService);
    recipeRepository = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity)
    );
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
    ingredientService = module.get<IngredientService>(IngredientService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(recipeService).toBeDefined();
    expect(recipeRepository).toBeDefined();
    expect(ingredientService).toBeDefined();
  });

  const recipeMock = {
    id: '1',
    titulo: 'titulo',
    subtitulo: 'subtitulo',
    descricao: 'descricao',
    tempo_preparo: new Date(),
    dificuldade: 'dificuldade',
    calorias: 100,
    imagem: 'imagem',
    created_at: new Date(),
    updated_at: new Date(),
  } as RecipeEntity;

  describe('create', () => {
    it('should create a recipe', async () => {
      //Arange
      const createDtoMock = {
        titulo: 'titulo',
        subtitulo: 'subtitulo',
        descricao: 'descricao',
        tempo_preparo: '10m',
        dificuldade: 'dificuldade',
        calorias: 100,
        imagem: 'imagem',
        userId: '1',
      } as CreateRecipeDto;

      jest.spyOn(recipeService, 'findByTitle').mockResolvedValueOnce(null);
      jest.spyOn(recipeRepository, 'create').mockReturnValueOnce(recipeMock);
      jest.spyOn(recipeRepository, 'save').mockResolvedValueOnce(recipeMock);
      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValueOnce({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce({ id: '1' }),
      } as unknown as SelectQueryBuilder<UserEntity>);
      //Act
      const result = await recipeService.create(createDtoMock);
      //Assert
      expect(result).toEqual(recipeMock);
      expect(recipeRepository.save).toBeCalledWith(recipeMock);
    });

    it('should throw an error when recipe already exists', async () => {
      //Arange
      const createDtoMock = {
        titulo: 'titulo',
        subtitulo: 'subtitulo',
        descricao: 'descricao',
        tempo_preparo: '10m',
        dificuldade: 'dificuldade',
        calorias: 100,
        imagem: 'imagem',
        userId: '1',
      } as CreateRecipeDto;

      jest
        .spyOn(recipeService, 'findByTitle')
        .mockResolvedValueOnce(recipeMock);
      //Act
      const result = recipeService.create(createDtoMock);
      //Assert
      await expect(result).rejects.toThrowError();
    });
  });

  describe('database requests', () => {
    it('should find a recipe by title', async () => {
      //Arrange
      const title = 'titulo';
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(recipeMock),
      } as unknown as SelectQueryBuilder<RecipeEntity>;
      jest
        .spyOn(recipeRepository, 'createQueryBuilder')
        .mockReturnValueOnce(queryBuilder);
      //Act
      const result = await recipeService.findByTitle(title);
      //Assert
      expect(result).toEqual(recipeMock);
    });
  });

  describe('Add ingredient to recipe', () => {
    it('should add an ingredient to a recipe', async () => {
      //Arrange
      const recipeId = '1';
      const ingredientId = 1;
      //Act
      const result = await recipeService.addRecipeIngredient(
        recipeId,
        ingredientId
      );
      //Assert
      expect(result).toEqual(recipeMock);
      expect(recipeRepository.save).toBeCalledWith(recipeMock);
    });
  });
});
