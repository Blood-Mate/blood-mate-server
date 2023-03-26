import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrivatePostShareRepository } from 'src/repositories/private-post-share.repository';
import { PrivatePostRepository } from 'src/repositories/private-post.repository';
import { ContactRepository } from 'src/repositories/contact.repository';
import { PostPrivatePostDto } from './dto/post-private-post.dto';
import { RepostPrivatePostDto } from './dto/repost-private-post.dto';
import { PrivatePost } from 'src/entities/private-post.entity';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';
import { UpdateContentDto } from './dto/update-content.dto';
import { UpdateFinishedStateDto } from './dto/update-finished-state.dto';
import { DeletePrivatePostDto } from './dto/delete-private-post.dto';
import { PostWardPostDto } from './dto/post-ward-post.dto';
import { Contact } from 'src/entities/contact.entity';

@Injectable()
export class PrivatePostService {
  constructor(
    private readonly privatePostRepository: PrivatePostRepository,
    private readonly privatePostShareRepository: PrivatePostShareRepository,
    private readonly contactRepository: ContactRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getSharedPrivatePost(userId: number) {
    const sharedLogs =
      await this.privatePostShareRepository.findPrivatePostSharingsByUserId(
        userId,
      );

    // Get shared posts
    const sharedPosts = Promise.all(
      sharedLogs.map(async (sharedLog) => {
        const post = await this.privatePostRepository.findBySharedLogId(
          sharedLog.id,
        );
        console.log(post);
        // Add publisher field
        const publisher = await this.contactRepository.getOneByPhoneNumber(
          userId,
          post.user.phoneNumber,
        );
        return { post, publisher };
      }),
    );

    // Filter finished posts.
    const filteredPosts = (await sharedPosts).filter((data) => {
      if (data.post.isFinished) return false;
      return true;
    });

    // Add origin post field (if exists)
    const posts = Promise.all(
      filteredPosts.map(async (postData) => {
        const originId = postData.post.originId;
        if (originId != -1) {
          const originPost = await this.privatePostRepository.findPostByPostId(
            originId,
          );
          const { post, publisher } = postData;
          return { post, publisher, originPost };
        }
        return postData;
      }),
    );

    return posts;
  }

  async getMyPrivatePost(userId: number): Promise<PrivatePost[]> {
    return this.privatePostRepository.findByUserId(userId);
  }

  async postWardPostWithAutoSharing(
    user: User,
    postWardPostDto: PostWardPostDto,
  ): Promise<void> {
    const { content, wardId } = postWardPostDto;
    const ward = await this.userRepository.findUserById(wardId);
    return this.postPrivatePostWithAutoSharing(ward, { content });
  }

  async postPrivatePostWithAutoSharing(
    user: User,
    postPrivatePostDto: PostPrivatePostDto,
  ): Promise<void> {
    const { content } = postPrivatePostDto;

    // Create post
    const post = await this.privatePostRepository.createPrivatePost(
      user,
      content,
    );

    // Auto Share
    this.shareToAllSendableContact(user, post);
  }

  async repostPrivatePostWithAutoSharing(
    user: User,
    repostPrivatePostDto: RepostPrivatePostDto,
  ): Promise<void> {
    const { content, originId, currentDepth } = repostPrivatePostDto;
    if (currentDepth > 1) {
      throw new BadRequestException(
        '리포스트는 2이상의 깊이를 가질 수 없습니다.',
      );
    }
    // Create repost
    const repost = await this.privatePostRepository.createPrivateRepost(
      user,
      content,
      originId,
      currentDepth,
    );

    // Auto Share
    this.shareToAllSendableContact(user, repost);
  }

  async shareToAllSendableContact(
    user: User,
    post: PrivatePost,
  ): Promise<void> {
    // Share above post to all sendable contact
    // Checked sendable and joined member
    const sendableContacts =
      await this.contactRepository.getSendingTargetContacts(user.id);
    sendableContacts.forEach(async (contact) => {
      const targetUser = await this.userRepository.findUserByPhoneNumber(
        contact.phoneNumber,
      );
      if (targetUser) {
        await this.privatePostShareRepository.createPrivatePostShare(
          user,
          targetUser,
          post,
        );
      }
    });
  }

  async isPostOwner(userId: number, postId: number): Promise<boolean> {
    const user = await this.userRepository.getUserWithPosts(postId);

    return user.id === userId;
  }

  async updateContent(user: User, updateContentDto: UpdateContentDto) {
    const { postId, content } = updateContentDto;
    if (this.isPostOwner(user.id, postId)) {
    }
    await this.privatePostRepository.updateContent(postId, content);
  }

  async updateFinishedState(
    user: User,
    updateFinishedStateDto: UpdateFinishedStateDto,
  ) {
    const { postId, isFinished } = updateFinishedStateDto;
    if (this.isPostOwner(user.id, postId)) {
      await this.privatePostRepository.updateFinishedState(postId, isFinished);
    }
    const respots = await this.privatePostRepository.findByOriginId(postId);
    respots.forEach(async (respost) => {
      return await this.privatePostRepository.updateFinishedState(
        respost.id,
        isFinished,
      );
    });
  }

  async deletePrivatePost(
    user: User,
    deletePrivatePostDto: DeletePrivatePostDto,
  ) {
    const { postId } = deletePrivatePostDto;

    const post = await this.privatePostRepository.findPostByPostId(postId);
    if (!post) {
      throw new NotFoundException('존재하지 않는 포스트입니다.');
    }
    if (!this.isPostOwner(user.id, postId)) {
      throw new ForbiddenException('본인의 포스트가 아닙니다.');
    }

    const sharedLogs = await this.privatePostShareRepository.findByPostId(
      postId,
    );
    for (const log of sharedLogs) {
      await this.privatePostShareRepository.deleteSharings(log.id);
    }
    await this.privatePostRepository.deletePrivatePost(postId);
  }
}
