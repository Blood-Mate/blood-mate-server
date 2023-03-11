import { ApiProperty } from '@nestjs/swagger';
import { Relationship } from 'src/types/enums';

export class ContactDto {
  @ApiProperty({ description: '연락처 id', type: Number })
  id!: number;

  @ApiProperty({ description: '이름', type: String })
  name!: string;

  @ApiProperty({ description: '전화번호', type: String })
  phoneNumber!: string;

  @ApiProperty({
    description: '관계',
    enum: Relationship,
    enumName: 'RelationShip',
    nullable: true,
  })
  relationship!: Relationship | null;

  @ApiProperty({ description: '알림 전송 여부', type: Boolean })
  isSendingTarget!: boolean;

  @ApiProperty({ description: '앱 등록 여부', type: Boolean })
  isUser!: boolean;
}

export class ContactListDto {
  @ApiProperty({ type: [ContactDto] })
  contacts!: ContactDto[];
}
