import { IsNumber, IsString } from 'class-validator';

export class CreateIngredientDto {
  @IsString()
  nome: string;

  @IsNumber()
  calorias: number;

  @IsNumber()
  carboidratos: number;

  @IsNumber()
  proteinas: number;

  @IsNumber()
  gordura: number;

  @IsNumber()
  porcao: number;
}
