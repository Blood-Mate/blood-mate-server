import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 조회' })
  async getUserInfo(@AuthUser() user: User): Promise<GetUserInfoDto> {
    return this.userService.getUserInfo(user.id);
  }

  @ApiBearerAuth()
  @Patch('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 정보 변경' })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() user: User,
  ) {
    return this.userService.updateUser(user.id, updateUserDto);
  }
}
