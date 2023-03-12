import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicPost } from 'src/entities/public-post.entity';
import { User } from 'src/entities/user.entity';
import { PublicPostRepository } from 'src/repositories/public-post.repository';
import { getDistance } from 'src/util/util';
import { GetPublicPostsDto } from './dto/get-public-posts.dto';
import { PostPublicPostDto } from './dto/post-public-post.dto';
import { UpdatePublicPostDto } from './dto/update-public-post.dto';

@Injectable()
export class PublicPostService {
  constructor(private readonly publicPostRepository: PublicPostRepository) {}

  async postPublicPost(
    user: User,
    postPublicPostDto: PostPublicPostDto,
  ): Promise<void> {
    return this.publicPostRepository.createPublicPost(user, postPublicPostDto);
  }

  async getPublicPosts(
    getPublicPostsDto: GetPublicPostsDto,
  ): Promise<PublicPost[]> {
    const {
      bloodType,
      bloodDonationType,
      region,
      latitude,
      longitude,
      distance,
    } = getPublicPostsDto;

    const posts = await this.publicPostRepository.getPublicPosts(
      bloodType,
      bloodDonationType,
      region,
    );

    return posts.filter((post) => {
      const postDistance = getDistance(
        latitude,
        longitude,
        post.latitude,
        post.longitude,
      );

      return postDistance < distance;
    });
  }

  async updatePublicPost(
    userId: number,
    updatePublicPostDto: UpdatePublicPostDto,
  ): Promise<void> {
    const result = await this.publicPostRepository.updatePublicPost(
      userId,
      updatePublicPostDto,
    );

    if (!result) {
      throw new NotFoundException(
        `User doesn't have a posting with id ${updatePublicPostDto.id}`,
      );
    }
  }

  async bumpPublicPost(userId: number, postId: number): Promise<void> {
    const result = await this.publicPostRepository.updateBump(userId, postId);

    if (!result) {
      throw new NotFoundException(
        `User doesn't have a posting with id ${postId}`,
      );
    }
  }

  async expirePublicPost(userId: number, postId: number): Promise<void> {
    const result = await this.publicPostRepository.updateExpire(userId, postId);

    if (!result) {
      throw new NotFoundException(
        `User doesn't have a posting with id ${postId}`,
      );
    }
  }

  async deletePublicPost(userId: number, postId: number) {
    const result = await this.publicPostRepository.deletePublicPost(
      userId,
      postId,
    );

    if (result.affected === 0) {
      throw new NotFoundException(
        `User doesn't have a posting with id ${postId}`,
      );
    }
  }
}
