import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { RecipeEntity } from './recipe.entity';

@Entity({ name: 'receita_interacao' })
export class RatingEntity {
  @PrimaryColumn({ name: 'id_usuario', type: 'uuid' })
  @ManyToOne(() => UserEntity, (user) => user.ratings)
  @JoinColumn({ name: 'id_usuario' })
  usuario: UserEntity;

  @PrimaryColumn({ name: 'id_receita', type: 'uuid' })
  @ManyToOne(() => RecipeEntity, (recipe) => recipe.ratings)
  @JoinColumn({ name: 'id_receita' })
  receita: RecipeEntity;

  @Column({ type: 'numeric', name: 'avaliacao', nullable: true })
  avaliacao?: number;

  @Column({ type: 'boolean', name: 'favorito', nullable: true })
  favorito?: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at?: Date;
}
