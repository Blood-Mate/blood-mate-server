import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRole } from 'src/types/enums';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이메일', type: String })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @IsAlphanumeric()
  @ApiProperty({ description: '비밀번호', type: String })
  password!: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  @ApiProperty({ description: '유저 역할', enum: UserRole })
  role!: UserRole;
}
