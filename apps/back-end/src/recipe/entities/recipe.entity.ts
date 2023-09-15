import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'receita' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.receitas)
  user: UserEntity;

  @Column({ name: 'titulo', nullable: false })
  titulo: string;

  @Column({ name: 'subtitulo' })
  subtitulo: string;

  @Column({ name: 'descricao', nullable: false })
  descricao: string;

  @Column({ name: 'tempo_preparo', nullable: false, type: 'interval' })
  tempo_preparo: Date;

  @Column({ name: 'dificuldade', nullable: false })
  dificuldade: string;

  @Column({ name: 'calorias' })
  calorias: number;

  @Column({ name: 'imagem', nullable: false })
  imagem: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
