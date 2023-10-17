import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'receita_interacao' })
export class RatingEntity {
  @PrimaryColumn({ type: 'uuid', name: 'id_usuario' })
  id_usuario: string;

  @PrimaryColumn({ type: 'uuid', name: 'id_receita' })
  id_receita: string;

  @Column({ type: 'numeric', name: 'avaliacao', nullable: true })
  avaliacao?: number;

  @Column({ type: 'boolean', name: 'favorito', nullable: true })
  favorito?: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  created_at?: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updated_at?: Date;
}
