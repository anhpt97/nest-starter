import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiPropertyOptional()
  refreshToken: string;
}
