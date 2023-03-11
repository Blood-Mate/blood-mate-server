import { Relationship } from 'src/types/enums';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  phoneNumber!: string;

  @Column({ nullable: true })
  relationship: Relationship;

  @Column({ default: true })
  isSendingTarget!: boolean;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;
}
