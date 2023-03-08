import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PrivatePost extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  originId!: number;

  @Column()
  userId!: number;

  @Column('text', { array: true })
  content!: string[];

  @Column({ type: 'int' })
  depth!: number;
}
