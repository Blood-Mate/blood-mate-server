import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class PostWardPostDto {
  @IsString()
  @ApiProperty({
    description: '글 내용',
    example: '저희 가족이 다녀서 Rh+ A형 피가 필요합니다.',
    type: 'string',
  })
  content!: string;

  @IsNumber()
  @ApiProperty({
    description: '피보호자 id',
    example: 1,
    type: 'number',
  })
  wardId!: number;
}
