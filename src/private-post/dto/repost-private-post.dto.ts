import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class RepostPrivatePostDto {
  @IsString()
  @ApiProperty({
    description: '글 내용',
    example: '제 친한 친구의 가족이 다녀서 Rh+ A형 피가 필요합니다.',
    type: 'string',
  })
  content!: string;

  @IsNumber()
  @ApiProperty({
    description: '원 글의 ID',
    example: 1,
    type: 'number',
  })
  originId!: number;

  @IsNumber()
  @ApiProperty({
    description: '나에게 공유한 사람의 리포스트 깊이',
    example: 1,
    type: 'number',
  })
  currentDepth!: number;
}
