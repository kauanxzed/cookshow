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
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let userService: UserService;
  let ingredientService: IngredientService;
  let recipeRepository: Repository<RecipeEntity>;
  let userRepository: Repository<UserEntity>;
  let recipeIngredientRepository: Repository<RecipeIngredientEntity>;

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
        {
          provide: getRepositoryToken(IngredientEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RecipeIngredientEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    recipeService = module.get<RecipeService>(RecipeService);
    recipeRepository = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity),
    );
    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    ingredientService = module.get<IngredientService>(IngredientService);
    recipeIngredientRepository = module.get<Repository<RecipeIngredientEntity>>(
      getRepositoryToken(RecipeIngredientEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(recipeService).toBeDefined();
    expect(recipeRepository).toBeDefined();
    expect(ingredientService).toBeDefined();
    expect(recipeIngredientRepository).toBeDefined();
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
      jest.spyOn(userService, 'findById').mockResolvedValueOnce({
        id: '1',
        nome: 'nome',
        email: 'email',
        senha: 'senha',
      } as unknown as UserEntity);
      jest.spyOn(recipeRepository, 'createQueryBuilder').mockReturnValueOnce({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ raw: recipeMock }),
      } as unknown as SelectQueryBuilder<RecipeEntity>);
      //Act
      const result = await recipeService.create(createDtoMock);
      //Assert
      expect(recipeRepository.createQueryBuilder).toBeCalled();
      expect(recipeRepository.createQueryBuilder).toBeCalledTimes(1);
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
        andWhere: jest.fn().mockReturnThis(),
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
      const recipeIngredient = {
        recipeId: '1',
        ingredientId: 1,
        porcao: 1,
      };

      const ingredientMock = {
        id: 1,
        nome: 'nome',
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;

      jest.spyOn(recipeService, 'findById').mockResolvedValueOnce(recipeMock);
      jest
        .spyOn(ingredientService, 'findById')
        .mockResolvedValueOnce(ingredientMock);
      const spy = jest
        .spyOn(recipeIngredientRepository, 'createQueryBuilder')
        .mockReturnValueOnce({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          execute: jest.fn().mockResolvedValueOnce(recipeIngredient),
        } as unknown as SelectQueryBuilder<RecipeIngredientEntity>);
      //Act
      await recipeService.addRecipeIngredient(
        recipeIngredient.recipeId,
        recipeIngredient.ingredientId,
        recipeIngredient.porcao,
      );
      //Assert
      expect(spy).toBeCalled();
    });

    it('should throw an error if cant add an ingredient to a recipe', async () => {
      //Arrange
      const recipeIngredient = {
        recipeId: '1',
        ingredientId: 1,
        porcao: 1,
      };

      const ingredientMock = {
        id: 1,
        nome: 'nome',
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;

      jest.spyOn(recipeService, 'findById').mockResolvedValueOnce(recipeMock);
      jest
        .spyOn(ingredientService, 'findById')
        .mockResolvedValueOnce(ingredientMock);
      jest
        .spyOn(recipeIngredientRepository, 'createQueryBuilder')
        .mockReturnValueOnce({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          execute: jest.fn().mockRejectedValueOnce(new Error()),
        } as unknown as SelectQueryBuilder<RecipeIngredientEntity>);
      //Act
      const result = recipeService.addRecipeIngredient(
        recipeIngredient.recipeId,
        recipeIngredient.ingredientId,
        recipeIngredient.porcao,
      );
      //Assert
      await expect(result).rejects.toThrowError();
    });
  });
});
