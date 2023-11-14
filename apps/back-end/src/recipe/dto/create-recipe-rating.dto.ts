import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional, IsUUID } from 'class-validator'

export class CreateRecipeRatingDto {
  @ApiProperty({
    type: 'uuid',
    description: 'The user id',
    example: '123456',
  })
  @IsUUID()
  id_usuario: string

  @ApiProperty({
    type: 'uuid',
    description: 'The recipe id',
    example: '123456',
  })
  @IsUUID()
  id_receita: string

  @ApiPropertyOptional({
    type: 'numeric',
    description: 'Rating of the recipe',
    example: 5,
  })
  @IsOptional()
  @IsNumber()
  avaliacao?: number

  @ApiPropertyOptional({
    type: 'boolean',
    description: 'Favorite recipe',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  favorito?: boolean
}
