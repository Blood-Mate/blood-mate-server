import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { User } from 'src/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: '로컬 회원가입' })
  async createUser(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.register(authCredentialsDto);
  }

  @Post('/login')
  @ApiOperation({ summary: '로컬 로그인' })
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<TokenResponseDto> {
    return this.authService.login(authCredentialsDto);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: '구글 로그인' })
  async googleAuth(): Promise<void> {
    //redirect google login page
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any): Promise<void> {
    return this.authService.googleLogin(req.user);
  }
}
