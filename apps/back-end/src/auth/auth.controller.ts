import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Get('/:token')
  getPayload(@Param(':token') token: string) {
    return this.authService.getUserPayload(token)
  }
}
