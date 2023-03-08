import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { BloodType } from 'src/types/enums';

export class ChangeBloodTypeDto {
  @IsEnum(BloodType)
  @ApiProperty({
    description: '혈액형',
    example: BloodType['A+'],
    type: 'enum',
    enum: BloodType,
  })
  bloodType!: BloodType;
}
