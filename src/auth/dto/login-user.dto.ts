import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    description: '전화번호',
    example: '+821026265901',
    type: String,
  })
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty({ description: '비밀번호', type: String })
  password!: string;
}
