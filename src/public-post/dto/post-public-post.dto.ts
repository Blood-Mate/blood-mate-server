import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BloodDonationType, BloodType, Region } from 'src/types/enums';

export class PostPublicPostDto {
  @IsEnum(BloodType)
  @ApiProperty({
    description: '혈액형',
    example: BloodType['A+'],
    type: 'enum',
    enum: BloodType,
  })
  bloodType!: BloodType;

  @IsEnum(BloodDonationType)
  @ApiProperty({
    description: '헌혈 종류',
    example: BloodDonationType.WB,
    type: 'enum',
    enum: BloodDonationType,
  })
  bloodDonationType!: BloodDonationType;

  @IsEnum(Region)
  @ApiProperty({
    description: '지역',
    example: Region.Korea,
    type: 'enum',
    enum: Region,
  })
  region!: Region;

  @IsNumber()
  @ApiProperty({ description: '위도', type: Number })
  latitude!: number;

  @IsNumber()
  @ApiProperty({ description: '경도', type: Number })
  longitude!: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '제목', type: String })
  title!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '내용', type: String })
  content!: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: '이미지 url', type: String })
  imageUrl!: string;
}
