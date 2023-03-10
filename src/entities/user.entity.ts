import { BloodType } from 'src/types/enums';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contact } from './contact.entity';
import { GuardianConnect } from './guardian-connect.entity';
import { PrivatePostShare } from './private-post-share.entity';
import { PrivatePost } from './private-post.entity';
import { PublicPost } from './public-post.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  phoneNumber!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  bloodType: BloodType;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => PublicPost, (publicPost) => publicPost.user)
  publicPosts: PublicPost[];

  @OneToMany(() => PrivatePost, (privatePost) => privatePost.user)
  privatePosts: PrivatePost[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(
    () => GuardianConnect,
    (guardianConnect) => guardianConnect.requestor,
  )
  sentGuardianRequests: GuardianConnect[];

  @OneToMany(
    () => GuardianConnect,
    (guardianConnect) => guardianConnect.guardian,
  )
  receivedGuardianRequests: GuardianConnect[];

  @OneToMany(() => PrivatePostShare, (share) => share.sender)
  sentPostShares: PrivatePostShare[];

  @OneToMany(() => PrivatePostShare, (share) => share.receiver)
  receivedPostShares: PrivatePostShare[];
}
