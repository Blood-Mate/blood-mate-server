import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { ChangeBloodTypeDto } from './dto/change-bloodtype.dto';
import { ChangeUserNameDto } from './dto/change-username.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
