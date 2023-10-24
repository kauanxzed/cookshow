import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
import { IngredientService } from '../ingredient/ingredient.service';
import { UserService } from '../user/user.service';
import { RecipeIngredientEntity } from './entities/recipe-ingredient.entity';
import { IngredientEntity } from '../ingredient/entities/ingredient.entity';
import { SharedUtilServer } from '@cook-show/shared/util-server';
import { UserEntity } from '../user/entities/user.entity';
import { RecipeRatingService } from './recipe.rating.service';
import { RatingEntity } from './entities/recipe-rating.entity';

describe('RecipeController', () => {
  let recipeController: RecipeController;
  let recipeService: RecipeService;
  let ingredientService: IngredientService;
  let userService: UserService;
  let recipeIngredientRepository: Repository<RecipeIngredientEntity>;
  let recipeRepository: Repository<RecipeEntity>;
  let sharedUtilServer: SharedUtilServer;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: Repository,
        },
        IngredientService,
        UserService,
        RecipeRatingService,
        {
          provide: getRepositoryToken(RecipeIngredientEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(IngredientEntity),
          useClass: Repository,
        },
        {
          provide: SharedUtilServer,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(RatingEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    sharedUtilServer = module.get<SharedUtilServer>(SharedUtilServer);
    recipeController = module.get<RecipeController>(RecipeController);
    recipeService = module.get<RecipeService>(RecipeService);
    ingredientService = module.get<IngredientService>(IngredientService);
    userService = module.get<UserService>(UserService);
    recipeIngredientRepository = module.get<Repository<RecipeIngredientEntity>>(
      getRepositoryToken(RecipeIngredientEntity)
    );
    recipeRepository = module.get<Repository<RecipeEntity>>(
      getRepositoryToken(RecipeEntity)
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
  });

  it('should be defined', () => {
    expect(recipeController).toBeDefined();
    expect(recipeService).toBeDefined();
    expect(ingredientService).toBeDefined();
    expect(userService).toBeDefined();
    expect(recipeIngredientRepository).toBeDefined();
    expect(recipeRepository).toBeDefined();
    expect(sharedUtilServer).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
