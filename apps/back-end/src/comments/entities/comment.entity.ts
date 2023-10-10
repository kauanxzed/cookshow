import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('receita_comentario')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  id_user: string;

  @Column({ type: 'uuid' })
  id_recipe: string;

  @Column({ type: 'varchar', length: 500 })
  mensagem: string;
}
