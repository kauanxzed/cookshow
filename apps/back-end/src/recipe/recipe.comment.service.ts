import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateCommentDto } from '../recipe/dto/create-recipe-comment.dto'
import { UpdateCommentDto } from '../recipe/dto/update-recipe-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentEntity } from '../recipe/entities/recipe-comment.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RecipeCommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<void> {
    try {
      await this.commentRepository
        .createQueryBuilder()
        .insert()
        .values(createCommentDto)
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(recipeId: string): Promise<CommentEntity[]> {
    const comentarios = await this.commentRepository
      .createQueryBuilder('receita_comentario')
      .where('receita_comentario.id_receita = :recipeId', { recipeId })
      .getMany()
    return comentarios
  }

  async findById(id: string): Promise<CommentEntity | null> {
    const foundComment = await this.commentRepository
      .createQueryBuilder('receita_comentario')
      .where('receita_comentario.id = :id', { id })
      .andWhere('receita_comentario.deleted_at IS NULL')
      .getOne()
    return foundComment
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
    const foundComment = await this.findById(id)
    if (!foundComment) {
      throw new HttpException('Comentário não encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.commentRepository
        .createQueryBuilder()
        .update(CommentEntity)
        .set({ ...updateCommentDto })
        .where('id = :id', { id })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async delete(id: string): Promise<void> {
    const foundComment = await this.findById(id)

    if (!foundComment) {
      throw new HttpException('Comentário não encontrado', HttpStatus.NOT_FOUND)
    }

    try {
      await this.commentRepository
        .createQueryBuilder()
        .update(CommentEntity)
        .set({ deleted_at: new Date() })
        .where('id = :id', { id })
        .execute()
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getRecipesComments(recipeId: string) {
    try {
      const comments = this.commentRepository
        .createQueryBuilder('comments')
        .where('comments.id_receita = :recipeId', { recipeId })
        .getMany()

      return comments
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getQuantCommentsRecipe(recipeId: string) {
    const comments = await this.getRecipesComments(recipeId)

    return comments.length
  }
}
