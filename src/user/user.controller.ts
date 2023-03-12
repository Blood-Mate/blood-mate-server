import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { ChangeBloodTypeDto } from './dto/change-bloodtype.dto';
import { ChangeUserNameDto } from './dto/change-username.dto';
import { GetUserInfoDto } from './dto/get-user-info';
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
  @Patch('/name')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 이름 변경' })
  async changeUserName(
    @Body() changeUserNameDto: ChangeUserNameDto,
    @AuthUser() user: User,
  ) {
    return this.userService.changeUserName(user.id, changeUserNameDto.name);
  }

  @ApiBearerAuth()
  @Patch('/blood-type')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '유저 혈액형 변경' })
  async changeBloodType(
    @Body() changeBloodTypeDto: ChangeBloodTypeDto,
    @AuthUser() user: User,
  ) {
    return this.userService.changeBloodType(
      user.id,
      changeBloodTypeDto.bloodType,
    );
  }
}
