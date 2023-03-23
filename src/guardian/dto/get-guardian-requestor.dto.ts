import { ApiProperty } from '@nestjs/swagger';
import { GuardianConnect } from 'src/entities/guardian-connect.entity';
import { BloodType } from 'src/types/enums';

export class GetGuardianRequestorDto {
  @ApiProperty({ description: '보호자 연결 id', type: Number })
  id!: number;

  @ApiProperty({ description: '요청자 유저 id', type: Number })
  requestorId!: number;

  @ApiProperty({ description: '전화번호', type: String })
  phoneNumber!: string;

  @ApiProperty({ description: '이름', type: String })
  name: string;

  @ApiProperty({ description: '혈액형', enum: BloodType, nullable: true })
  bloodType!: BloodType | null;

  static of(connect: GuardianConnect): GetGuardianRequestorDto {
    const { id, phoneNumber, name, bloodType } = connect.requestor;
    return {
      id: connect.id,
      requestorId: id,
      phoneNumber,
      name,
      bloodType,
    };
  }
}
