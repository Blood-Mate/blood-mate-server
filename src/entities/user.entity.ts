import { UserRole } from 'src/types/enums';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  userId: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GENERAL })
  role!: UserRole;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  provider: string;
}
