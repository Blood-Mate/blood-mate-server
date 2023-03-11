import { Module } from '@nestjs/common';
import { PrivatePostService } from './private-post.service';
import { PrivatePostController } from './private-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { PrivatePost } from 'src/entities/private-post.entity';
import { PrivatePostShare } from 'src/entities/private-post-share.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, PrivatePost, PrivatePostShare])],
  controllers: [PrivatePostController],
  providers: [PrivatePostService],
})
export class PrivatePostModule {}
