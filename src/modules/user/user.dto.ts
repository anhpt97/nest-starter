import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { UserRole, UserStatus } from '~/common/enums';
import { ConvertToNumber } from '~/utils';

export class UserParams {
  @IsInt()
  @ConvertToNumber()
  @ApiProperty()
  id: number;
}

export class UserQuery {
  @IsOptional()
  @ApiPropertyOptional()
  keyword: string;
}

export class UserDto {
  @IsString()
  @ApiProperty({ example: '' })
  username: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: '' })
  email: string;

  @IsEnum(UserRole)
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @IsEnum(UserStatus)
  @ApiProperty({ enum: UserStatus })
  status: UserStatus;
}
