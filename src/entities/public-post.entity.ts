import { BloodDonationType, BloodType } from 'src/types/enums';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PublicPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  bloodType!: BloodType;

  @Column()
  bloodDonatonType!: BloodDonationType;

  @Column()
  location!: string;

  @Column({ type: 'decimal' })
  latitude!: number;

  @Column({ type: 'decimal' })
  longitude!: number;

  @Column()
  title!: string;

  @Column('text', { array: true })
  content!: string[];

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @Column({ default: false })
  expired!: boolean;

  @ManyToOne(() => User, (user) => user.publicPosts)
  user: User;
}
