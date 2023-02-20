import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRole } from 'src/types/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register/:role')
  @ApiOperation({ summary: '로컬 회원가입' })
  async createUser(
    @Param('role') role: UserRole,
    @Body() authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.register(authCredentialsDto, role);
  }

  @Post('/login/:role')
  @ApiOperation({ summary: '로컬 로그인' })
  async login(
    @Param('role') role: UserRole,
    @Body() authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.login(authCredentialsDto, role);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: '일반 유저 구글 로그인' })
  async googleAuth(): Promise<void> {
    //redirect google login page
  }

  @Get('/google/guardian')
  @UseGuards(AuthGuard('google-guardian'))
  @ApiOperation({ summary: '보호자 유저 구글 로그인' })
  async googleAuthGuardian(): Promise<void> {
    //redirect google login page
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any): Promise<void> {
    return this.authService.googleLogin(req.user);
  }
}
