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

    try {
      this.ingredientRepository
        .createQueryBuilder()
        .insert()
        .values(createIngredientDto)
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto
  ): Promise<void> {
    const foundIngredient = await this.findById(id);
    if (!foundIngredient) {
      throw new BadRequestException('Ingrediente não encontrado');
    }

    try {
      await this.ingredientRepository
        .createQueryBuilder()
        .update(IngredientEntity)
        .set({ ...updateIngredientDto })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: number): Promise<void> {
    const foundIngredient = await this.findById(id);

    if (!foundIngredient) {
      throw new BadRequestException('Ingrediente não encontrado');
    }

    try {
      await this.ingredientRepository
        .createQueryBuilder()
        .update(IngredientEntity)
        .set({ deleted_at: new Date() })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByName(name: string): Promise<IngredientEntity | null> {
    const foundIngredient = await this.ingredientRepository
      .createQueryBuilder('ingredientes')
      .where('ingredientes.nome = :nome', { nome: name })
      .andWhere('ingredientes.deleted_at IS NULL')
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
      .andWhere('ingredientes.deleted_at IS NULL')
      .getOne();

    return foundIngredient;
  }
}
