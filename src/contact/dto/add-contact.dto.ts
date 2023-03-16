import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

export class AddContactListDto {
  @ApiProperty({ type: [AddContactDto] })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddContactDto)
  contacts: AddContactDto[];
}
