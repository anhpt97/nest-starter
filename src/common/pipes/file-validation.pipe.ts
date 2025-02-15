import {
  Injectable,
  NotFoundException,
  PayloadTooLargeException,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { ErrorCode, FileType } from '../enums';

interface ValidationOptions {
  allowedTypes: string[];
  maxSize: number;
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private options: ValidationOptions;

  constructor(options?: Partial<ValidationOptions>) {
    this.options = {
      allowedTypes: options?.allowedTypes || Object.values(FileType),
      maxSize: options?.maxSize || 10485760, // 10 MiB
    };
  }

  transform(files: Express.Multer.File[]) {
    if (!files.length) {
      throw new NotFoundException(ErrorCode.FILE_NOT_FOUND);
    }
    files.forEach(({ mimetype, size }) => {
      if (!this.options.allowedTypes.includes(mimetype)) {
        throw new UnsupportedMediaTypeException(ErrorCode.INVALID_FILE_FORMAT);
      }
      if (size > this.options.maxSize) {
        throw new PayloadTooLargeException(ErrorCode.FILE_TOO_LARGE);
      }
    });
    return files;
  }
}
