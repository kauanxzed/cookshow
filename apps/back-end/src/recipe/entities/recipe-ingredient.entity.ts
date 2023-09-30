import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { RecipeEntity } from './recipe.entity';
import { IngredientEntity } from '../../ingredient/entities/ingredient.entity';

@Entity({ name: 'receita_ingredientes' })
export class RecipeIngredientEntity {
  @PrimaryColumn({ name: 'id_ingrediente' })
  idIngredient: number;

  @PrimaryColumn({ name: 'id_receita' })
  idRecipe: string;

  @ManyToOne(
    () => IngredientEntity,
    (ingredient: IngredientEntity) => ingredient.recipes,
  )
  @JoinColumn({ name: 'id_ingrediente' })
  ingredient: IngredientEntity;

  @ManyToOne(() => RecipeEntity, (recipe: RecipeEntity) => recipe.ingredients)
  @JoinColumn({ name: 'id_receita' })
  recipe: RecipeEntity;

  @Column({ name: 'porcao' })
  portion: number;
}
