import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileValidationPipe } from '~/common/pipes';
import { UploadFilesDto } from './file.dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFilesDto })
  upload(
    @UploadedFiles(new FileValidationPipe()) files: Express.Multer.File[],
  ) {
    // eslint-disable-next-line no-console
    console.log(files);
  }
}
