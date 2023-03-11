import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PrivatePost } from './private-post.entity';
import { User } from './user.entity';

@Entity()
export class PrivatePostShare extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.sentPostShares)
  sender!: User;

  @ManyToOne(() => User, (user) => user.receivedPostShares)
  receiver!: User;

  @ManyToOne(() => PrivatePost, (privatePost) => privatePost.shares)
  post!: PrivatePost;
}
