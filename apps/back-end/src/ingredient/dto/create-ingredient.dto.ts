import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateIngredientDto {
  @ApiProperty({
    description: 'The name of the ingredient',
    example: 'Banana',
  })
  @IsString()
  nome: string

  @ApiProperty({
    description: 'The calories of the ingredient',
    example: '200Kcal',
  })
  @IsNumber()
  calorias: number

  @ApiProperty({
    description: 'The carbohydrates of the ingredient',
    example: '100g',
  })
  @IsNumber()
  carboidratos: number

  @ApiProperty({
    description: 'The protein of the ingredient',
    example: '50g',
  })
  @IsNumber()
  proteinas: number

  @ApiProperty({
    description: 'The fat of the ingredient',
    example: '3%',
  })
  @IsNumber()
  gordura: number

  @ApiProperty({
    description: 'The portion of the ingredient',
    example: '8',
  })
  @IsNumber()
  porcao: number
}
