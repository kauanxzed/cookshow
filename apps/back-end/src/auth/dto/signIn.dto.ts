import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'email is not be empty',
  })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  senha: string;
}
