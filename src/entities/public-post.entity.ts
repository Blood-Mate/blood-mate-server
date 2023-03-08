import { BloodDonationType, BloodType } from 'src/types/enums';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class PublicPost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

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

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ default: false })
  expired!: boolean;
}
