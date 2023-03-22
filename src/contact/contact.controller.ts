import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { validate } from 'class-validator';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { ContactService } from './contact.service';
import { AddContactDto, AddContactListDto } from './dto/add-contact.dto';
import { ChangeSendingTargetDto } from './dto/change-sending-target.dto';
import { ContactDto } from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiBearerAuth()
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: AddContactListDto })
  @ApiOperation({ summary: '지인 연락처 등록' })
  async addContacts(
    @Body() addContactListDto: AddContactListDto,
    @AuthUser() user: User,
  ) {
    return this.contactService.addContacts(user, addContactListDto.contacts);
  }

  @ApiBearerAuth()
  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지인 연락처 조회' })
  async getContacts(@AuthUser() user: User): Promise<ContactDto[]> {
    return this.contactService.getContacts(user.id);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지인 연락처 삭제' })
  async deleteContact(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) contactId: number,
  ) {
    return this.contactService.deleteContact(user.id, contactId);
  }

  @ApiBearerAuth()
  @Patch('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '알림 전송 여부 수정' })
  async changeSendingTarget(
    @AuthUser() user: User,
    @Body() changeSendingTargetDto: ChangeSendingTargetDto,
  ) {
    return this.contactService.changeSendingTarget(
      user.id,
      changeSendingTargetDto,
    );
  }
}
