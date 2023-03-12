import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class GuardianConnect extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.sentGuardianRequests)
  requestor!: User;

  @ManyToOne(() => User, (user) => user.receivedGuardianRequests)
  guardian!: User;
}
