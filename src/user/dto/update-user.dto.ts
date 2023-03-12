import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BloodType } from 'src/types/enums';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '이름', type: String })
  name!: string;

  @IsOptional()
  @IsEnum(BloodType)
  @ApiProperty({
    description: '혈액형',
    example: BloodType['A+'],
    type: 'enum',
    enum: BloodType,
  })
  bloodType!: BloodType;
}
