import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { CheckPhoneNumberExistDto } from './dto/check-phonenumber-exist.dto';

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

  @Get('/phone-number/duplicate')
  @ApiOperation({ summary: '전화번호 중복 확인' })
  async checkPhoneNumberExist(
    @Body() checkPhoneNumberExistDto: CheckPhoneNumberExistDto,
  ): Promise<boolean> {
    return this.authService.checkPhoneNumberExist(
      checkPhoneNumberExistDto.phoneNumber,
    );
  }
}
