import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/decorator/auth-user.docrator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { PublicPost } from 'src/entities/public-post.entity';
import { User } from 'src/entities/user.entity';
import { GetPublicPostsDto } from './dto/get-public-posts.dto';
import { PostPublicPostDto } from './dto/post-public-post.dto';
import { UpdatePublicPostDto } from './dto/update-public-post.dto';
import { PublicPostService } from './public-post.service';

@Controller('public-post')
export class PublicPostController {
  constructor(private readonly publicPostService: PublicPostService) {}

  @ApiBearerAuth()
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지역 지정헌혈 포스팅 작성' })
  async postPublicPost(
    @Body() postPublicPostDto: PostPublicPostDto,
    @AuthUser() user: User,
  ): Promise<void> {
    return this.publicPostService.postPublicPost(user, postPublicPostDto);
  }

  @Get('/')
  @ApiOperation({ summary: '지역 지정헌혈 포스팅 조회' })
  async getPublicPosts(
    @Body() getPublicPostsDto: GetPublicPostsDto,
  ): Promise<PublicPost[]> {
    return this.publicPostService.getPublicPosts(getPublicPostsDto);
  }

  @ApiBearerAuth()
  @Patch('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지역 지정헌혈 포스팅 내용 수정' })
  async updatePublicPost(
    @Body() updatePublicPostDto: UpdatePublicPostDto,
    @AuthUser() user: User,
  ): Promise<void> {
    return this.publicPostService.updatePublicPost(
      user.id,
      updatePublicPostDto,
    );
  }

  @ApiBearerAuth()
  @Patch('/bump/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지역 지정헌혈 포스팅 끌올하기' })
  async bumpPublicPost(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<void> {
    return this.publicPostService.bumpPublicPost(user.id, postId);
  }

  @ApiBearerAuth()
  @Patch('/expire/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지역 지정헌혈 포스팅 만료시키기' })
  async expirePublicPost(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<void> {
    return this.publicPostService.expirePublicPost(user.id, postId);
  }

  @ApiBearerAuth()
  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '지역 지정헌혈 포스팅 삭제' })
  async deletePublicPost(
    @AuthUser() user: User,
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<void> {
    return this.publicPostService.deletePublicPost(user.id, postId);
  }
}
