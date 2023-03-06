import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ description: '액세스 토큰', type: String })
  accessToken!: string;

  @ApiProperty({ description: '리프레쉬 토큰', type: String })
  refreshToken!: string;
}
