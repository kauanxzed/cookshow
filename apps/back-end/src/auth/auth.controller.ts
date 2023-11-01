import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { Request as ExpressRequest } from 'express'
import { JwtAuthGuard } from './jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getPayload(@Request() req: ExpressRequest) {
    return req.user
  }
}
