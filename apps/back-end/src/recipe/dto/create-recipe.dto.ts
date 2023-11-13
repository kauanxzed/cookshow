import { IsString, IsNumber, IsUUID, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRecipeDto {
  @ApiProperty({
    description: 'The title of the recipe',
    example: ['Bolo de Cenoura'],
  })
  @IsString()
  titulo: string

  @ApiProperty({
    description: 'The subtitle of the recipe',
    example: ['The best cake ever!'],
  })
  @IsString()
  @IsOptional()
  subtitulo?: string

  @ApiProperty({
    description: 'The description of the recipe',
    example: [
      'This carrot cake is super fluffy and filled with lots of chocolate, perfect for enjoying an afternoon coffee!',
    ],
  })
  @IsString()
  descricao: string

  @ApiProperty({
    description: 'The preparation time of the recipe',
    example: ['60 minutes'],
  })
  tempo_preparo: string

  @ApiProperty({
    description: 'The difficulty of the recipe',
    example: ['Easy'],
  })
  @IsString()
  dificuldade: string

  @ApiProperty({
    description: 'The calories of the recipe',
    example: ['200Kcal'],
  })
  @IsNumber()
  calorias: number

  @ApiProperty({
    description: 'The image of the recipe',
    example: ['https://www.google.com.br'],
  })
  imagem: string

  @ApiProperty({
    description: 'The uuid of the recipe',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
  })
  @IsUUID()
  userId: string
}
