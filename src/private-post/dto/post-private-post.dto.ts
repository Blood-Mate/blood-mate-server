import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostPrivatePostDto {
  @IsString()
  @ApiProperty({
    description: '글 내용',
    example: '저희 가족이 다녀서 Rh+ A형 피가 필요합니다.',
    type: 'string',
  })
  content!: string;
}
