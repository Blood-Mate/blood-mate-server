import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CheckPhoneNumberExistDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    description: '전화번호',
    example: '+821026265901',
    type: String,
  })
  phoneNumber!: string;
}
