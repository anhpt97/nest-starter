import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode } from '../enums';

export class ValidationError {
  @ApiProperty()
  field: string;

  @ApiProperty()
  message: string;
}

export class Error {
  @ApiProperty({ enum: ErrorCode })
  code: ErrorCode;

  @ApiProperty()
  message: string;

  @ApiProperty({ type: [ValidationError] })
  details: ValidationError[];
}
