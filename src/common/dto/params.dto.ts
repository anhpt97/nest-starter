import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class Params {
  @IsNumberString()
  @ApiProperty()
  id: string;
}
