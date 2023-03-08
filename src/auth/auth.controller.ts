import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiOperation({ summary: '회원가입' })
  async createUser(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() loginUserDto: LoginUserDto): Promise<TokenResponseDto> {
    return this.authService.login(loginUserDto);
  }
}
