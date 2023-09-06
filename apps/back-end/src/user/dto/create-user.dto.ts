import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'Username cannot be empty',
  })
  username: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'Email cannot be empty',
  })
  email: string;

  @IsStrongPassword(
    {},
    {
      message: 'Password not strong enough',
    }
  )
  @IsNotEmpty({
    message: 'Password cannot be empty',
  })
  @MinLength(6, {
    message: 'Password should be at least 6 letters',
  })
  senha: string;

  @IsUrl()
  foto_perfil?: string;
}
