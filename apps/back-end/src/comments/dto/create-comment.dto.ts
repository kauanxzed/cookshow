import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The id of the user',
    example: ['1'],
  })
  @IsUUID()
  id_user: string;

  @ApiProperty({
    description: 'The id of the recipe',
    example: ['1'],
  })
  @IsUUID()
  id_recipe: string;

  @ApiProperty({
    description: 'The message of the comment',
    example: ['This recipe is very good'],
  })
  @IsString()
  mensagem: string;
}
