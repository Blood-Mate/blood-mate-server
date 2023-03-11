import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddContactDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '지인 이름', type: String })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: '지인 연락처', type: String })
  phoneNumber!: string;
}
