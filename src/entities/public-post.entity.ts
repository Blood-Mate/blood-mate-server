import { BloodDonationType, BloodType, Region } from 'src/types/enums';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PublicPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bloodType!: BloodType;

  @Column()
  bloodDonationType!: BloodDonationType;

  @Column()
  region!: Region;

  @Column({ type: 'decimal' })
  latitude!: number;

  @Column({ type: 'decimal' })
  longitude!: number;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: Date })
  bumpAt: Date;

  @Column({ default: false })
  expired!: boolean;

  @ManyToOne(() => User, (user) => user.publicPosts)
  user: User;
}
