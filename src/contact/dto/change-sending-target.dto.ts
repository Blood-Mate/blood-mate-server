import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class ChangeSendingTargetDto {
  @IsNumber()
  @ApiProperty({ description: '연락처 id', type: Number })
  contactId!: number;

  @IsBoolean()
  @ApiProperty({ description: '알림 전송 여부', type: Boolean })
  isSendingTarget!: boolean;
}
