import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<void> {
    try {
      this.commentRepository
        .createQueryBuilder()
        .insert()
        .values(createCommentDto)
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll(): Promise<CommentEntity[]> {
    const comentarios = this.commentRepository
      .createQueryBuilder('receita_comentario')
      .getMany();
    return comentarios;
  }

  async findById(id: string): Promise<CommentEntity | null> {
    const foundComment = await this.commentRepository
      .createQueryBuilder('receita_comentario')
      .where('receita_comentario.id = :id', { id })
      .getOne();
    return foundComment;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
    const foundComment = await this.findById(id);
    if (!foundComment) {
      throw new BadRequestException('Comentário não encontrado');
    }

    try {
      await this.commentRepository
        .createQueryBuilder()
        .update(CommentEntity)
        .set({ ...updateCommentDto })
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    const foundComment = await this.findById(id);

    if (!foundComment) {
      throw new BadRequestException('Comentário não encontrado');
    }

    try {
      await this.commentRepository
        .createQueryBuilder()
        .update(CommentEntity)
        .where('id = :id', { id })
        .execute();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
