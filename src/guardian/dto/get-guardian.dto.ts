import { ApiProperty } from '@nestjs/swagger';
import { Guardian } from 'src/entities/guardian.entity';
import { BloodType } from 'src/types/enums';

export class GetGuardianDto {
  @ApiProperty({ description: '보호자 요청 id', type: Number })
  id!: number;

  @ApiProperty({ description: '보호자 유저 id', type: Number })
  guardianId!: number;

  @ApiProperty({ description: '전화번호', type: String })
  phoneNumber!: string;

  @ApiProperty({ description: '이름', type: String })
  name: string;

  @ApiProperty({ description: '혈액형', enum: BloodType, nullable: true })
  bloodType!: BloodType | null;

  static of(guardian: Guardian): GetGuardianDto {
    const { id, phoneNumber, name, bloodType } = guardian.guardian;
    return {
      id: guardian.id,
      guardianId: id,
      phoneNumber,
      name,
      bloodType,
    };
  }
}
