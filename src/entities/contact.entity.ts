import { Relationship } from 'src/types/enums';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  name!: string;

  @Column()
  phoneNumber!: string;

  @Column({ nullable: true })
  relationship: Relationship;

  @Column({ default: true })
  isSendingTarget!: boolean;
}
