import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, Validate } from 'class-validator';
import { UserRole, UserStatus } from '~/common/enums';
import { isPassword, isUsername } from '~/utils';

export class UpdateUserDto {
  @Validate(isUsername)
  @ApiProperty({ example: '' })
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: '' })
  email: string;

  @IsOptional()
  @Validate(isPassword)
  @ApiPropertyOptional({ example: '' })
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @IsEnum(UserStatus)
  @ApiProperty({ enum: UserStatus })
  status: UserStatus;
}

export class CreateUserDto extends OmitType(UpdateUserDto, ['password']) {
  @Validate(isPassword)
  @ApiProperty({ example: '' })
  password: string;
}
