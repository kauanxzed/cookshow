import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from '../dto/create-recipe-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
