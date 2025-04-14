import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  file: Express.Multer.File;
}
