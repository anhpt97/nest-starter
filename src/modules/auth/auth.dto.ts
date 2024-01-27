import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'superadmin' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  otp: string;
}

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  refreshToken: string;
}

export class ResetPasswordDto {
  @IsEmail()
  @ApiProperty({ example: '' })
  email: string;
}
