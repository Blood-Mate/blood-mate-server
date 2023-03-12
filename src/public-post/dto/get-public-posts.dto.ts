import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { BloodDonationType, BloodType, Region } from 'src/types/enums';

export class GetPublicPostsDto {
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

  @IsNumber()
  @ApiProperty({ description: '거리', example: '5(km)', type: Number })
  distance!: number;
}
