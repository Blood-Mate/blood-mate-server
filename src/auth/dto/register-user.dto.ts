import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { BloodType } from 'src/types/enums';

export class RegisterUserDto {
  @IsNotEmpty()
  @ApiProperty({ description: '전화번호', type: String })
  phoneNumber!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty({ description: '비밀번호', type: String })
  password!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름', type: String })
  name!: string;

  @IsEnum(BloodType)
  @ApiProperty({
    description: '혈액형',
    example: BloodType['A+'],
    type: 'enum',
    enum: BloodType,
  })
  bloodType!: BloodType;
}
