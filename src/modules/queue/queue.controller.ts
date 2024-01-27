import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileValidationPipe } from '~/common/pipes';
import { UploadBody } from './queue.dto';
import { QueueService } from './queue.service';

@ApiTags('queue')
@Controller('queue')
export class QueueController {
  constructor(private queueService: QueueService) {}

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadBody })
  upload(
    @UploadedFiles(new FileValidationPipe()) files: Express.Multer.File[],
  ) {
    this.queueService.upload(files);
  }
}
