import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'The email of the user',
    example: ['teste@teste.com'],
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'email is not be empty',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: ['Abc123!@#'],
  })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  senha: string;
}
