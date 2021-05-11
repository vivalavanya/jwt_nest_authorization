import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { JwtAuthGuard } from './guards/ jwt-auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}
  
  // @UseGuards(LocalAuthGuard)
  @Post('rest/auth/login')
  async login(@Body() authUserDto: AuthUserDto) {
    return this.authService.login(authUserDto);
  }


  @Post('rest/auth/refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh(refreshTokenDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('rest/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}