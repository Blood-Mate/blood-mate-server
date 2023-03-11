import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Guardian extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.sentGuardianRequests)
  requestor!: User;

  @ManyToOne(() => User, (user) => user.receivedGuardianRequests)
  guardian!: User;
}
