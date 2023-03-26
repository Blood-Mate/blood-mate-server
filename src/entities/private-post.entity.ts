import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PrivatePostShare } from './private-post-share.entity';
import { User } from './user.entity';

@Entity()
export class PrivatePost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  originId!: number;

  @Column('text')
  content!: string;

  @Column({ type: 'int' })
  depth!: number;

  @Column({ default: false })
  isFinished!: boolean;

  @ManyToOne(() => User, (user) => user.privatePosts)
  user!: User;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => PrivatePostShare,
    (privatePostShare) => privatePostShare.post,
  )
  shares!: PrivatePostShare[];
}
