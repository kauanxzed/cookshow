import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.commentsService.findById(id);
  }

  @Get()
  async findAll() {
    return await this.commentsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return await this.commentsService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.commentsService.delete(id);
  }
}
