import { Test, TestingModule } from '@nestjs/testing';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecipeEntity } from './entities/recipe.entity';
describe('RecipeController', () => {
  let controller: RecipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeController],
      providers: [
        RecipeService,
        {
          provide: getRepositoryToken(RecipeEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<RecipeController>(RecipeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
