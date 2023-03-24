import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { AddGuardianDto } from './dto/add-guardian.dto';
import { DeleteGuardianDto } from './dto/delete-guardian.dto';
import { GetGuardianRequestorDto } from './dto/get-guardian-requestor.dto';
import { GetGuardianDto } from './dto/get-guardian.dto';
import { GuardianService } from './guardian.service';

@Controller('guardian')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @ApiBearerAuth()
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '보호자 등록' })
  async addGuardian(
    @Body() addGuardianDto: AddGuardianDto,
    @AuthUser() user: User,
  ): Promise<void> {
    return this.guardianService.addGuardian(user, addGuardianDto.phoneNumber);
  }

  @ApiBearerAuth()
  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '보호자 조회' })
  async getGuardians(
    @AuthUser() user: User,
  ): Promise<Promise<GetGuardianDto>[]> {
    return this.guardianService.getGuardians(user.id);
  }

  @ApiBearerAuth()
  @Get('/requestor')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '나를 보호자로 등록한 사용자 조회' })
  async getGuardianRequestors(
    @AuthUser() user: User,
  ): Promise<GetGuardianRequestorDto[]> {
    return this.guardianService.getGuardianRequestors(user.id);
  }

  @ApiBearerAuth()
  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '보호자 삭제' })
  async deleteGuardian(
    @Body() deleteGuardianDto: DeleteGuardianDto,
    @AuthUser() user: User,
  ): Promise<void> {
    return this.guardianService.deleteGuardian(user.id, deleteGuardianDto.id);
  }
}
