import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { isPassword } from '~/utils';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '' })
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @Validate(isPassword)
  @ApiProperty({ example: '' })
  newPassword: string;
}
