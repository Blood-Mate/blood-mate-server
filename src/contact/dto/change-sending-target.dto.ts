import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeSendingTargetDto {
  @IsNotEmpty()
  @ApiProperty({ description: '연락처 id', type: Number })
  contactId!: number;

  @IsNotEmpty()
  @ApiProperty({ description: '알림 전송 여부', type: Boolean })
  isSendingTarget!: boolean;
}
