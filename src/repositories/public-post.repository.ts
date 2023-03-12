import { InjectRepository } from '@nestjs/typeorm';
import { PublicPost } from 'src/entities/public-post.entity';
import { User } from 'src/entities/user.entity';
import { PostPublicPostDto } from 'src/public-post/dto/post-public-post.dto';
import { UpdatePublicPostDto } from 'src/public-post/dto/update-public-post.dto';
import { BloodDonationType, BloodType, Region } from 'src/types/enums';
import { DeleteResult, Repository } from 'typeorm';

export class PublicPostRepository extends Repository<PublicPost> {
  constructor(
    @InjectRepository(PublicPost)
    private readonly repository: Repository<PublicPost>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async createPublicPost(
    user: User,
    postPublicPostDto: PostPublicPostDto,
  ): Promise<void> {
    const post = await this.repository.create({
      user,
      bumpAt: new Date(),
      ...postPublicPostDto,
    });

    try {
      await this.repository.save(post);
    } catch (e) {
      throw e;
    }
  }

  async getPublicPosts(
    bloodType: BloodType,
    bloodDonationType: BloodDonationType,
    region: Region,
  ): Promise<PublicPost[]> {
    return this.repository.find({
      where: {
        bloodType,
        bloodDonationType,
        region,
      },
      order: {
        bumpAt: 'DESC',
      },
    });
  }

  async updatePublicPost(
    userId: number,
    updateDto: UpdatePublicPostDto,
  ): Promise<boolean> {
    const post = await this.repository.findOne({
      where: {
        id: updateDto.id,
        user: { id: userId },
      },
    });

    if (!post) return false;

    try {
      await this.repository.save({ ...post, ...updateDto });
      return true;
    } catch (e) {
      throw e;
    }
  }

  async updateBump(userId: number, postId: number): Promise<boolean> {
    const post = await this.repository.findOne({
      where: {
        id: postId,
        user: { id: userId },
      },
    });

    if (!post) return false;

    post.bumpAt = new Date();

    try {
      await this.repository.save(post);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async updateExpire(userId: number, postId: number): Promise<boolean> {
    const post = await this.repository.findOne({
      where: {
        id: postId,
        user: { id: userId },
      },
    });

    if (!post) return false;

    post.expired = true;

    try {
      await this.repository.save(post);
      return true;
    } catch (e) {
      throw e;
    }
  }

  async deletePublicPost(
    userId: number,
    postId: number,
  ): Promise<DeleteResult> {
    return this.repository.delete({
      id: postId,
      user: { id: userId },
    });
  }
}
