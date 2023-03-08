import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Guardian extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  requestorId!: number;

  @Column()
  guardianId!: number;
}
