import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { RecipeEntity } from '../../recipe/entities/recipe.entity';

@Entity({name: 'ingredientes'})
export class IngredientEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'calorias', type: 'numeric', precision: 5, scale: 2 })
  calorias: number;

  @Column({ name: 'carboidratos', type: 'numeric', precision: 5, scale: 2 })
  carboidratos: number;

  @Column({ name: 'proteinas', type: 'numeric', precision: 5, scale: 2 })
  proteinas: number;

  @Column({ name: 'gordura', type: 'numeric', precision: 5, scale: 2 })
  gordura: number;

  @Column({ name: 'porcao', type: 'numeric', precision: 5, scale: 2 })
  porcao: number;

  @ManyToOne(() => RecipeEntity, (recipe: RecipeEntity) => recipe.ingredients)
  recipe: RecipeEntity;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
