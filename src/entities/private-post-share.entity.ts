import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrivatePostShare extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  senderId!: number;

  @Column()
  receiverId!: number;

  @Column()
  postId!: number;
}
