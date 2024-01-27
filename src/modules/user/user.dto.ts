import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { UserRole, UserStatus } from '~/common/enums';
import { ConvertToNumber, isPassword, isUsername } from '~/utils';

export class UserParams {
  @IsInt()
  @ConvertToNumber()
  @ApiProperty()
  id: number;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Validate(isUsername)
  @ApiProperty({ example: '' })
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: '' })
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Validate(isPassword)
  @ApiPropertyOptional({ example: '' })
  password: string;

  @IsEnum(UserRole)
  @ApiProperty({ example: UserRole.ADMIN })
  role: UserRole;

  @IsEnum(UserStatus)
  @ApiProperty({ example: UserStatus.ACTIVE })
  status: UserStatus;
}

export class CreateUserDto extends OmitType(UpdateUserDto, ['password']) {
  @IsString()
  @IsNotEmpty()
  @Validate(isPassword)
  @ApiProperty({ example: '' })
  password: string;
}
