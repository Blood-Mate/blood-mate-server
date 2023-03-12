import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BloodDonationType, BloodType } from 'src/types/enums';

export class UpdatePublicPostDto {
  @IsNumber()
  @ApiProperty({ description: '포스트 id', type: Number })
  id!: number;

  @IsOptional()
  @IsEnum(BloodType)
  @ApiProperty({
    description: '혈액형',
    example: BloodType['A+'],
    type: 'enum',
    enum: BloodType,
  })
  bloodType!: BloodType;

  @IsOptional()
  @IsEnum(BloodDonationType)
  @ApiProperty({
    description: '헌혈 종류',
    example: BloodDonationType.WB,
    type: 'enum',
    enum: BloodDonationType,
  })
  bloodDonationType!: BloodDonationType;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '제목', type: String })
  title!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '내용', type: String })
  content!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이미지 url', type: String, nullable: true })
  imageUrl!: string | null;
}
