import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { IngredientEntity } from './entities/ingredient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('IngredientService', () => {
  let ingredientService: IngredientService;
  let ingredientRepository: Repository<IngredientEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: getRepositoryToken(IngredientEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    ingredientService = module.get<IngredientService>(IngredientService);
    ingredientRepository = module.get<Repository<IngredientEntity>>(
      getRepositoryToken(IngredientEntity)
    );
  });

  it('should be defined', () => {
    expect(ingredientService).toBeDefined();
    expect(ingredientRepository).toBeDefined();
  });

  describe('database transactions', () => {
    it('should create an ingredient', async () => {
      console.log('dadaw');
    });
  });
});
