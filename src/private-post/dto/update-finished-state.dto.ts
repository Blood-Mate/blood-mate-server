import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class UpdateFinishedStateDto {
  @IsNumber()
  @ApiProperty({
    description: '포스팅 아이디',
    example: 1,
    type: 'number',
  })
  postId!: number;

  @IsBoolean()
  @ApiProperty({
    description: '완료 상태',
    example: true,
    type: 'boolean',
  })
  isFinished!: boolean;
}
