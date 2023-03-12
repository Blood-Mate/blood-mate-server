import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicPost } from 'src/entities/public-post.entity';
import { PublicPostRepository } from 'src/repositories/public-post.repository';
import { PublicPostController } from './public-post.controller';
import { PublicPostService } from './public-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicPost])],
  controllers: [PublicPostController],
  providers: [PublicPostService, PublicPostRepository],
})
export class PublicPostModule {}
