import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (user?.senha !== signInDto.senha) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.usuario };

    const access_token = await this.jwtService.signAsync(payload);
    return access_token;
  }
}
