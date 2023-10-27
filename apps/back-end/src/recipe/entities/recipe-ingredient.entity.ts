import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RecipeEntity } from './recipe.entity';
import { IngredientEntity } from '../../ingredient/entities/ingredient.entity';

@Entity({ name: 'receita_ingredientes' })
export class RecipeIngredientEntity {
  @PrimaryColumn({ name: 'id_ingrediente', type: 'int4' })
  @ManyToOne(() => IngredientEntity, (ingredient) => ingredient.recipes)
  @JoinColumn({ name: 'id_ingrediente' })
  ingredient: IngredientEntity;

  @PrimaryColumn({ name: 'id_receita', type: 'uuid' })
  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ingredients)
  @JoinColumn({ name: 'id_receita' })
  recipe: RecipeEntity;

  @Column({ name: 'porcao' })
  portion: number;
}
