import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadBody {
  @ApiPropertyOptional({ format: 'binary' })
  file: string;
}
