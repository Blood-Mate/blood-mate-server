import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @ApiProperty({ description: '아이디', type: String })
  userId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty({ description: '비밀번호', type: String })
  password!: string;
}
