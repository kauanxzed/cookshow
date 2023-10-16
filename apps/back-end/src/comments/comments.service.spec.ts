import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

describe('CommentsService', () => {
  let commentService: CommentsService;
  let commentRepository: Repository<CommentEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        { provide: getRepositoryToken(CommentEntity), useClass: Repository },
      ],
    }).compile();

    commentService = module.get<CommentsService>(CommentsService);
    commentRepository = module.get<Repository<CommentEntity>>(
      getRepositoryToken(CommentEntity)
    );
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
    expect(commentRepository).toBeDefined();
  });

  describe('create', () => {
    let createCommentDto: CreateCommentDto;
    let commentEntity: CommentEntity;

    beforeEach(async () => {
      createCommentDto = {
        id_usuario: '1',
        id_receita: '1',
        mensagem: 'This is a comment',
      } as CreateCommentDto;

      commentEntity = {
        ...createCommentDto,
        id: '1',
      } as CommentEntity;
    });

    it('should create a new comment', async () => {
      //Arrange
      jest.spyOn(commentService, 'findById').mockResolvedValueOnce(null);

      jest.spyOn(commentRepository, 'createQueryBuilder').mockReturnValue({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ raw: [commentEntity] }),
      } as unknown as SelectQueryBuilder<CommentEntity>);
      //Act
      await commentService.create(commentEntity);
      //Assert
      expect(commentRepository.createQueryBuilder).toBeCalledTimes(1);
    });
  });
});
