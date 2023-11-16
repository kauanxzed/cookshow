import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { Request as ExpressRequest } from 'express'
import { JwtAuthGuard } from './jwt-auth.guard'
import { ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The payload of the user',
  })
  @UseGuards(JwtAuthGuard)
  getPayload(@Request() req: ExpressRequest) {
    return req.user
  }
}
