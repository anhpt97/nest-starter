import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ValidateFilePipe } from '~/common/pipes';
import { UploadDto } from './file.dto';

@ApiTags('file')
@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadDto })
  upload(@UploadedFiles(new ValidateFilePipe()) files: Express.Multer.File[]) {
    // eslint-disable-next-line no-console
    console.log(files);
  }
}
