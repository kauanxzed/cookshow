import { Test, TestingModule } from '@nestjs/testing';
import { IngredientService } from './ingredient.service';
import { IngredientEntity } from './entities/ingredient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

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

  describe('Create', () => {
    let createIngredientDto: CreateIngredientDto;
    let ingredientEntity: IngredientEntity;

    beforeEach(async () => {
      createIngredientDto = {
        nome: 'Arroz',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
      } as CreateIngredientDto;

      ingredientEntity = {
        ...createIngredientDto,
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;
    });

    it('should create an ingredient', async () => {
      // Arrange
      jest.spyOn(ingredientService, 'findByName').mockResolvedValueOnce(null);
      jest
        .spyOn(ingredientRepository, 'create')
        .mockReturnValueOnce(ingredientEntity);
      jest
        .spyOn(ingredientRepository, 'save')
        .mockResolvedValueOnce(ingredientEntity);
      // Act
      await ingredientService.create(createIngredientDto);
      // Assert
      expect(ingredientRepository.create).toHaveBeenCalledWith(
        createIngredientDto
      );
      expect(ingredientRepository.save).toBeCalledTimes(1);
      expect(ingredientRepository.save).toHaveBeenCalledWith(ingredientEntity);
    });

    it('should not create an ingredient', async () => {
      // Arrange
      jest
        .spyOn(ingredientService, 'findByName')
        .mockResolvedValueOnce(ingredientEntity);
      jest
        .spyOn(ingredientRepository, 'create')
        .mockReturnValueOnce(ingredientEntity);
      jest
        .spyOn(ingredientRepository, 'save')
        .mockResolvedValueOnce(ingredientEntity);
      // Act
      await expect(
        ingredientService.create(createIngredientDto)
      ).rejects.toThrowError('Ingrediente já cadastrado');
      // Assert
      expect(ingredientRepository.save).toBeCalledTimes(0);
    });
  });

  describe('Find By Name', () => {
    let createIngredientDto: CreateIngredientDto;
    let ingredientEntity: IngredientEntity;

    beforeEach(async () => {
      createIngredientDto = {
        nome: 'Arroz',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
      } as CreateIngredientDto;

      ingredientEntity = {
        ...createIngredientDto,
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;
    });

    it('should find a ingredient by its name', async () => {
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(ingredientEntity),
      } as unknown as SelectQueryBuilder<IngredientEntity>;

      jest
        .spyOn(ingredientRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      // Act
      const result = await ingredientService.findByName(
        createIngredientDto.nome
      );
      // Assert
      expect(result).toEqual(ingredientEntity);
    });

    it('should not find a ingredient by its name', async () => {
      // Arrange
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(null),
      } as unknown as SelectQueryBuilder<IngredientEntity>;

      jest
        .spyOn(ingredientRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      // Act
      const result = await ingredientService.findByName('Teste');
      // Assert
      expect(result).toBeNull();
    });
  });

  describe('Find By Id', () => {
    it('should find a ingredient by its id', async () => {
      // Arrange
      const ingredientEntity = {
        id: 1,
        nome: 'Arroz',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;

      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(ingredientEntity),
      } as unknown as SelectQueryBuilder<IngredientEntity>;

      jest
        .spyOn(ingredientRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      // Act
      const result = await ingredientService.findById(1);
      // Assert
      expect(result).toEqual(ingredientEntity);
    });

    it('should not find a ingredient by its id', async () => {
      // Arrange
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(null),
      } as unknown as SelectQueryBuilder<IngredientEntity>;

      jest
        .spyOn(ingredientRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      // Act
      const result = await ingredientService.findById(1);
      // Assert
      expect(result).toBeNull();
    });
  });

  describe('Find All', () => {
    it('should find all ingredients', async () => {
      // Arrange
      const ingredientEntity = {
        id: 1,
        nome: 'Arroz',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;

      const ingredientEntity2 = {
        id: 2,
        nome: 'Feijão',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;

      const ingredientEntities = [ingredientEntity, ingredientEntity2];

      const queryBuilder = {
        getMany: jest.fn().mockResolvedValueOnce(ingredientEntities),
      } as unknown as SelectQueryBuilder<IngredientEntity>;

      jest
        .spyOn(ingredientRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      // Act
      const result = await ingredientService.findAll();
      // Assert
      expect(result).toEqual(ingredientEntities);
    });

    it('should not find any ingredients', async () => {
      // Arrange
      const queryBuilder = {
        getMany: jest.fn().mockResolvedValueOnce([]),
      } as unknown as SelectQueryBuilder<IngredientEntity>;

      jest
        .spyOn(ingredientRepository, 'createQueryBuilder')
        .mockReturnValue(queryBuilder);
      // Act
      const result = await ingredientService.findAll();
      // Assert
      expect(result).toEqual([]);
    });
  });

  describe('Update', () => {
    let updateIngredientDto: UpdateIngredientDto;
    let ingredientEntity: IngredientEntity;
    let updatedIngredient: IngredientEntity;

    beforeEach(async () => {
      updateIngredientDto = {
        nome: 'Arroz',
        calorias: 100,
        carboidratos: 30,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
      };

      updatedIngredient = {
        id: 1,
        nome: 'Arroz',
        calorias: 100,
        carboidratos: 30,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
        updated_at: new Date(),
      } as IngredientEntity;

      ingredientEntity = {
        nome: 'Arroz',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
        id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;
    });

    it('should update an ingredient', async () => {
      // Arrange
      jest
        .spyOn(ingredientService, 'findById')
        .mockResolvedValueOnce(ingredientEntity);
      jest
        .spyOn(ingredientRepository, 'create')
        .mockReturnValueOnce(updatedIngredient);
      jest.spyOn(ingredientRepository, 'update').mockResolvedValueOnce({
        raw: [],
        affected: 1,
        generatedMaps: [],
      });
      // Act
      await ingredientService.update(1, updateIngredientDto);
      // Assert
      expect(ingredientRepository.create).toBeCalledTimes(1);
      expect(ingredientRepository.update).toHaveBeenCalledWith(
        updatedIngredient.id,
        updatedIngredient
      );
    });

    it('should not update an ingredient', async () => {
      // Arrange
      jest.spyOn(ingredientService, 'findById').mockResolvedValueOnce(null);
      jest
        .spyOn(ingredientRepository, 'save')
        .mockResolvedValueOnce(ingredientEntity);
      // Act
      await expect(
        ingredientService.update(1, updatedIngredient)
      ).rejects.toThrowError('Ingrediente não encontrado');
      // Assert
      expect(ingredientRepository.save).toBeCalledTimes(0);
    });
  });

  describe('Delete', () => {
    let ingredientEntity: IngredientEntity;

    beforeEach(async () => {
      ingredientEntity = {
        id: 1,
        nome: 'Arroz',
        calorias: 130,
        carboidratos: 28,
        proteinas: 2.7,
        gordura: 0.3,
        porcao: 100,
        created_at: new Date(),
        updated_at: new Date(),
      } as IngredientEntity;
    });

    it('should delete an ingredient', async () => {
      // Arrange
      jest.spyOn(ingredientRepository, 'delete').mockResolvedValueOnce({
        raw: [],
        affected: 1,
      });
      jest
        .spyOn(ingredientService, 'findById')
        .mockResolvedValueOnce(ingredientEntity);
      jest.spyOn(ingredientRepository, 'update').mockResolvedValueOnce({
        raw: [],
        affected: 1,
        generatedMaps: [],
      });
      // Act
      await ingredientService.delete(1);
      // Assert
      expect(ingredientRepository.update).toHaveBeenCalledTimes(1);
    });

    it('should not delete an ingredient', async () => {
      // Arrange
      jest.spyOn(ingredientService, 'findById').mockResolvedValueOnce(null);
      jest.spyOn(ingredientRepository, 'update').mockResolvedValueOnce({
        raw: [],
        affected: 0,
        generatedMaps: [],
      });
      // Act
      await expect(ingredientService.delete(1)).rejects.toThrowError(
        'Ingrediente não encontrado'
      );
      // Assert
      expect(ingredientRepository.update).toHaveBeenCalledTimes(0);
    });
  });
});
