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
  usuario: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

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
