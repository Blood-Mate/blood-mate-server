import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrivatePostShare } from 'src/entities/private-post-share.entity';
import { PrivatePost } from 'src/entities/private-post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrivatePostShareRepository extends Repository<PrivatePostShare> {
  constructor(
    @InjectRepository(PrivatePostShare)
    private readonly repository: Repository<PrivatePostShare>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async findPrivatePostSharingsByUserId(
    userId: number,
  ): Promise<PrivatePostShare[]> {
    return this.repository.find({
      where: { receiver: { id: userId } },
    });
  }

  async createPrivatePostShare(
    user: User,
    receiver: User,
    post: PrivatePost,
  ): Promise<PrivatePostShare> {
    const share = await this.repository.create({
      sender: user,
      receiver,
      post,
    });
    return this.repository.save(share);
  }
}
