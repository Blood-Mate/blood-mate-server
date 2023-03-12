import { ApiProperty } from '@nestjs/swagger';
import { Guardian } from 'src/entities/guardian.entity';
import { BloodType } from 'src/types/enums';

export class GetGuardianRequestorDto {
  @ApiProperty({ description: '보호자 요청 id', type: Number })
  id!: number;

  @ApiProperty({ description: '요청자 유저 id', type: Number })
  requstorId!: number;

  @ApiProperty({ description: '전화번호', type: String })
  phoneNumber!: string;

  @ApiProperty({ description: '이름', type: String })
  name: string;

  @ApiProperty({ description: '혈액형', enum: BloodType, nullable: true })
  bloodType!: BloodType | null;

  static of(guardian: Guardian): GetGuardianRequestorDto {
    const { id, phoneNumber, name, bloodType } = guardian.requestor;
    return {
      id: guardian.id,
      requstorId: id,
      phoneNumber,
      name,
      bloodType,
    };
  }
}
