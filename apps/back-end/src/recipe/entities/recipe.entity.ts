import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RecipeIngredientEntity } from './recipe-ingredient.entity';

@Entity({ name: 'receita' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'id_usuario' })
  user: UserEntity;

  @Column({ name: 'titulo', nullable: false })
  titulo: string;

  @Column({ name: 'subtitulo', nullable: true })
  subtitulo?: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({ name: 'tempo_preparo', nullable: false, type: 'interval' })
  tempo_preparo: Date;

  @Column({ name: 'dificuldade', nullable: false })
  dificuldade: string;

  @Column({ name: 'calorias', nullable: false }) // propriedade não tem que estar na entity
  calorias: number;

  @Column({ name: 'imagem', nullable: false })
  imagem: string;

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient: RecipeIngredientEntity) => recipeIngredient.ingredient,
  )
  ingredients: RecipeIngredientEntity[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
