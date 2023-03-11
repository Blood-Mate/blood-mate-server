import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeletePrivatePostDto {
  @IsNumber()
  @ApiProperty({
    description: '포스팅 아이디',
    example: 1,
    type: 'number',
  })
  postId!: number;
}
