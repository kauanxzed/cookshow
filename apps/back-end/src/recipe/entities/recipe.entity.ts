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
} from 'typeorm'
import { UserEntity } from '../../user/entities/user.entity'
import { RecipeIngredientEntity } from './recipe-ingredient.entity'
import { RatingEntity } from './recipe-rating.entity'

@Entity({ name: 'receita' })
export class RecipeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'id_usuario' })
  user: UserEntity

  @Column({ name: 'titulo', nullable: false })
  titulo: string

  @Column({ name: 'subtitulo', nullable: true })
  subtitulo?: string

  @Column({ name: 'descricao', nullable: false })
  descricao: string

  @Column({ name: 'tempo_preparo', nullable: false, type: 'interval' })
  tempo_preparo: Date

  @Column({ name: 'dificuldade', nullable: false })
  dificuldade: string

  @Column({ name: 'calorias', nullable: false }) // propriedade não tem que estar na entity
  calorias: number

  @Column({ name: 'imagem', nullable: false })
  imagem: string

  @Column({ name: 'imagem_id', nullable: false })
  imagem_id: string

  @OneToMany(
    () => RecipeIngredientEntity,
    (recipeIngredient: RecipeIngredientEntity) => recipeIngredient.ingredient,
  )
  ingredients: RecipeIngredientEntity[]

  @OneToMany(() => RatingEntity, (rating: RatingEntity) => rating.receita)
  ratings?: RatingEntity[]

  @OneToMany(() => RatingEntity, (rating: RatingEntity) => rating.receita)
  comentarios?: RatingEntity[]

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deleted_at?: Date

  @Column({ name: 'publicado', nullable: false, default: false })
  publicado: boolean
}
