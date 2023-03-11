import { Module } from '@nestjs/common';
import { PrivatePostService } from './private-post.service';
import { PrivatePostController } from './private-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/entities/contact.entity';
import { PrivatePost } from 'src/entities/private-post.entity';
import { PrivatePostShare } from 'src/entities/private-post-share.entity';
import { User } from 'src/entities/user.entity';
import { ContactRepository } from 'src/repositories/contact.repository';
import { PrivatePostRepository } from 'src/repositories/private-post.repository';
import { PrivatePostShareRepository } from 'src/repositories/private-post-share.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contact, PrivatePost, PrivatePostShare, User]),
  ],
  controllers: [PrivatePostController],
  providers: [
    PrivatePostService,
    ContactRepository,
    PrivatePostRepository,
    PrivatePostShareRepository,
    UserRepository,
  ],
})
export class PrivatePostModule {}
