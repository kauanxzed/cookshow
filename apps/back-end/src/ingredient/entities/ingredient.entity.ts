import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ingredientes')
export class IngredientEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'calorias' })
  calorias: number;

  @Column({ name: 'carboidratos' })
  carboidratos: number;

  @Column({ name: 'proteinas' })
  proteinas: number;

  @Column({ name: 'gordura' })
  gordura: number;

  @Column({ name: 'porcao' })
  porcao: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date;
}
