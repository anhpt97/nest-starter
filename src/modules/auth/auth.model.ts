import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  constructor({ accessToken }: { accessToken: string }) {
    return { accessToken };
  }
}
