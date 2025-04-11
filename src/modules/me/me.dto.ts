import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';
import { isPassword } from '~/utils';

export class ChangePasswordDto {
  @IsString()
  @ApiProperty({ example: '' })
  currentPassword: string;

  @Validate(isPassword)
  @ApiProperty({ example: '' })
  newPassword: string;
}
