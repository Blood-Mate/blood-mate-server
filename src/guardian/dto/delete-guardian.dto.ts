import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteGuardianDto {
  @IsNumber()
  @ApiProperty({ description: '삭제할 보호자 id', type: Number })
  id!: number;
}
