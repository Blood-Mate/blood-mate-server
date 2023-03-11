import { BadRequestException, Injectable } from '@nestjs/common';
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

@Injectable()
export class PrivatePostService {
  constructor(
    private readonly privatePostRepository: PrivatePostRepository,
    private readonly privatePostShareRepository: PrivatePostShareRepository,
    private readonly contactRepository: ContactRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getSharedPrivatePost(userId: number): Promise<PrivatePost[]> {
    const sharedLogs =
      await this.privatePostShareRepository.findPrivatePostSharingsByUserId(
        userId,
      );

    // Get shared posts
    const sharedPosts = sharedLogs
      .map((sharedLog) => {
        return sharedLog.post;
      })
      // Filter finished posts
      .filter((post) => {
        if (post.isFinished) return false;
        return true;
      });

    return sharedPosts;
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
    const post = await this.privatePostRepository.findPostByPostId(postId);
    return post.user.id === userId;
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
  }

  async deletePrivatePost(
    user: User,
    deletePrivatePostDto: DeletePrivatePostDto,
  ) {
    const { postId } = deletePrivatePostDto;
    if (this.isPostOwner(user.id, postId)) {
      await this.privatePostRepository.deletePrivatePost(postId);
    }
  }
}
