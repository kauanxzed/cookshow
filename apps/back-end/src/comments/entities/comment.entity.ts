import { Delete } from '@nestjs/common';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeEntity } from '../../recipe/entities/recipe.entity';

@Entity('receita_comentario')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  id_usuario: string;

  @ManyToOne(() => RecipeEntity)
  @JoinColumn({ name: 'id_receita' })
  @Column({ type: 'uuid' })
  id_receita: string;

  @Column({ type: 'varchar', length: 500 })
  mensagem: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
