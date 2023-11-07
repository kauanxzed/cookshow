import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { SignInDto } from './dto/signIn.dto'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { SharedUtilServer } from '@cook-show/shared/util-server'
import { PayloadType } from './types/payload.type'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly sharedUtilServer: SharedUtilServer,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.usersService.findByEmail(signInDto.email)

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }
    if (
      (await this.sharedUtilServer.compare(signInDto.senha, user?.senha)) ===
      false
    ) {
      throw new HttpException('Senha inválida', HttpStatus.NOT_ACCEPTABLE)
    }

    try {
      const payload: PayloadType = { sub: user?.id, username: user?.usuario }
      const access_token = await this.jwtService.signAsync(payload)

      return access_token
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
    }
  }
}
