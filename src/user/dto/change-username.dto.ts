import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeUserNameDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름', type: String })
  name!: string;
}
