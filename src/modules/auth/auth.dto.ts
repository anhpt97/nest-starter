import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsString()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty({ example: '' })
  email: string;
}
