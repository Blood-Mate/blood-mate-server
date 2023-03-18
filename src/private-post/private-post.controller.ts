import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { UpdateContentDto } from './dto/update-content.dto';
import { UpdateFinishedStateDto } from './dto/update-finished-state.dto';
import { DeletePrivatePostDto } from './dto/delete-private-post.dto';
import { PostWardPostDto } from './dto/post-ward-post.dto';

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
  @Post('/guardian')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '(보호자)지인지정헌혈 포스팅 최초작성 및 연락처기반 자동 공유',
  })
  postWardPostWithAutoSharing(
    @Body() postWardPostDto: PostWardPostDto,
    @AuthUser() user: User,
  ) {
    return this.privatePostService.postWardPostWithAutoSharing(
      user,
      postWardPostDto,
    );
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

  @ApiBearerAuth()
  @Patch('/content')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '지인지정헌혈 포스팅 내용 수정',
  })
  updateContent(
    @Body() updateContentDto: UpdateContentDto,
    @AuthUser() user: User,
  ) {
    return this.privatePostService.updateContent(user, updateContentDto);
  }

  @ApiBearerAuth()
  @Patch('/finished')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '지인지정헌혈 완료상태 변경',
  })
  updateFinishedState(
    @Body() updateFinishedStateDto: UpdateFinishedStateDto,
    @AuthUser() user: User,
  ) {
    return this.privatePostService.updateFinishedState(
      user,
      updateFinishedStateDto,
    );
  }

  @ApiBearerAuth()
  @Delete('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '지인지정헌혈 게시글 삭제',
  })
  deletePrivatePost(
    @Body() deletePrivatePostDto: DeletePrivatePostDto,
    @AuthUser() user: User,
  ) {
    return this.privatePostService.deletePrivatePost(
      user,
      deletePrivatePostDto,
    );
  }
}
