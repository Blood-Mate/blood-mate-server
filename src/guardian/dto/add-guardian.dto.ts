import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class AddGuardianDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({
    description: '보호자 연락처',
    example: '+821012341234',
    type: String,
  })
  phoneNumber!: string;
}
