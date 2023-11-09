import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
  IsOptional,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: ['Admin'],
  })
  @IsString()
  @IsNotEmpty({
    message: 'Username cannot be empty',
  })
  usuario: string

  @ApiProperty({
    description: 'The email of the user',
    example: ['gustavo@alunos.unicesumar.edu.br'],
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    description: 'The password of the user',
    example: ['Abc123!@#'],
  })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1,
    },
    {
      message: 'Password not strong enough',
    },
  )
  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  @MinLength(6, {
    message: 'Password should be at least 6 letters',
  })
  senha: string

  @ApiProperty({
    description: 'The profile picture of the user',
    example: ['https://www.google.com.br'],
  })
  @IsOptional()
  foto_perfil?: string
}
