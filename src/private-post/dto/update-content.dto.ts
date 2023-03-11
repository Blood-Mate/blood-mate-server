import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateContentDto {
  @IsNumber()
  @ApiProperty({
    description: '포스팅 아이디',
    example: 1,
    type: 'number',
  })
  postId!: number;

  @IsString()
  @ApiProperty({
    description: '글 내용',
    example: '제 친한 친구의 가족이 다녀서 Rh+ B형 피가 필요합니다.',
    type: 'string',
  })
  content!: string;
}
