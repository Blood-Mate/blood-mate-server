import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivatePost } from 'src/entities/private-post.entity';
import { User } from 'src/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PrivatePostRepository extends Repository<PrivatePost> {
  constructor(
    @InjectRepository(PrivatePost)
    private readonly repository: Repository<PrivatePost>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findPostByPostId(postId: number): Promise<PrivatePost> {
    return this.repository.findOne({
      where: {
        id: postId,
      },
    });
  }

  async createPrivatePost(user: User, content: string): Promise<PrivatePost> {
    const post = await this.repository.create({
      user,
      content,
      depth: 0,
    });
    post.originId = post.id;
    return await this.repository.save(post);
  }

  async createPrivateRepost(
    user: User,
    content: string,
    originId: number,
    currentDepth: number,
  ): Promise<PrivatePost> {
    const repost = await this.repository.create({
      user,
      content,
      originId,
      depth: currentDepth + 1,
    });
    return await this.repository.save(repost);
  }

  async updateContent(postId: number, content: string): Promise<PrivatePost> {
    const post = await this.findPostByPostId(postId);
    post.content = content;
    return await this.repository.save(post);
  }

  async updateFinishedState(
    postId: number,
    isFinished: boolean,
  ): Promise<PrivatePost> {
    const post = await this.findPostByPostId(postId);
    post.isFinished = isFinished;
    return await this.repository.save(post);
  }

  async deletePrivatePost(postId): Promise<DeleteResult> {
    return this.repository.delete(postId);
  }
}
