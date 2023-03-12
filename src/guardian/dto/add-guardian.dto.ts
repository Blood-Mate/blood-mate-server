import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddGuardianDto {
  @IsNumber()
  @ApiProperty({ description: '보호자로 등록할 유저 id', type: Number })
  id!: number;
}
