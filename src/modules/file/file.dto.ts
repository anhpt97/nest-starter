import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadFilesDto {
  @ApiPropertyOptional({ format: 'binary' })
  file: string;
}
