import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientEntity } from './entities/ingredient.entity';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientRepository: Repository<IngredientEntity>
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<void> {
    const foundIngredient = await this.findByName(createIngredientDto.nome);
    if (foundIngredient) {
      throw new BadRequestException('Ingrediente já cadastrado');
    }
    const ingredient = await this.ingredientRepository.create(
      createIngredientDto
    );
    await this.ingredientRepository.save(ingredient);
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto
  ): Promise<void> {
    const foundIngredient = await this.findById(id);
    if (!foundIngredient) {
      throw new BadRequestException('Ingrediente não encontrado');
    }
    const ingredient = await this.ingredientRepository.create(
      updateIngredientDto
    );
    await this.ingredientRepository.update(id, ingredient);
  }

  async findByName(name: string): Promise<IngredientEntity | null> {
    const foundIngredient = await this.ingredientRepository
      .createQueryBuilder('ingredientes')
      .where('ingredientes.nome = :nome', { nome: name })
      .getOne();

    return foundIngredient;
  }

  async findAll(): Promise<IngredientEntity[]> {
    const ingredients = await this.ingredientRepository
      .createQueryBuilder('ingredientes')
      .getMany();

    return ingredients;
  }

  async findById(id: number): Promise<IngredientEntity | null> {
    const foundIngredient = await this.ingredientRepository
      .createQueryBuilder('ingredientes')
      .where('ingredientes.id = :id', { id })
      .getOne();

    return foundIngredient;
  }
}
