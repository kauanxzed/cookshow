import { IsString, IsUrl, IsNumber, IsUUID, IsOptional } from 'class-validator';
import { UserEntity } from '../../user/entities/user.entity';

export class CreateRecipeDto {
  @IsString()
  titulo: string;

  @IsString()
  @IsOptional()
  subtitulo?: string;

  @IsString()
  descricao: string;

  tempo_preparo: string;

  @IsString()
  dificuldade: string;

  @IsNumber()
  calorias: number;

  @IsUrl()
  imagem: string;

  @IsUUID()
  userId: string;
}
