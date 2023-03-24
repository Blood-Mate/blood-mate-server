import { ApiProperty } from '@nestjs/swagger';
import { GuardianConnect } from 'src/entities/guardian-connect.entity';
import { BloodType } from 'src/types/enums';

export class GetGuardianDto {
  @ApiProperty({ description: 'id', type: Number })
  id!: number;

  @ApiProperty({ description: '보호자 id', type: Number })
  guardianId!: number;

  @ApiProperty({ description: '전화번호', type: String })
  phoneNumber!: string;

  @ApiProperty({ description: '이름', type: String })
  name: string;

  @ApiProperty({ description: '혈액형', enum: BloodType, nullable: true })
  bloodType!: BloodType | null;

  static of(connect: GuardianConnect): GetGuardianDto {
    const { id, phoneNumber, bloodType } = connect.guardian;
    return {
      id: connect.id,
      guardianId: id,
      phoneNumber,
      name: null,
      bloodType,
    };
  }
}
