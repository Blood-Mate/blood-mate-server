import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PrivatePostService } from './private-post.service';
import { PostPrivatePostDto } from './dto/post-private-post.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RepostPrivatePostDto } from './dto/repost-private-post.dto';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { User } from 'src/entities/user.entity';

@Controller('private-post')
export class PrivatePostController {
  constructor(private readonly privatePostService: PrivatePostService) {}

  @ApiBearerAuth()
  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '자신에게 공유된 지인지정헌혈 포스팅 가져오기',
  })
  getSharedPrivatePost(@AuthUser() user: User) {
    return this.privatePostService.getSharedPrivatePost(user.id);
  }

  @ApiBearerAuth()
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '지인지정헌혈 포스팅 최초작성 및 연락처기반 자동 공유',
  })
  postPrivatePostWithAutoSharing(
    @Body() postPrivatePostDto: PostPrivatePostDto,
    @AuthUser() user: User,
  ) {
    return this.privatePostService.postPrivatePostWithAutoSharing(
      user,
      postPrivatePostDto,
    );
  }

  @ApiBearerAuth()
  @Post('/repost')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '지인지정헌혈 포스팅 리포스트 및 연락처기반 자동 공유',
  })
  repostPrivatePostWithAutoSharing(
    @Body() repostPrivatePostDto: RepostPrivatePostDto,
    @AuthUser() user: User,
  ) {
    return this.privatePostService.repostPrivatePostWithAutoSharing(
      user,
      repostPrivatePostDto,
    );
  }
}
