import {
  Injectable,
  NotFoundException,
  PayloadTooLargeException,
  PipeTransform,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { File } from '../constants';
import { ErrorCode } from '../enums';

interface ValidationOptions {
  allowedTypes: string[];
  maxSize: number;
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private options: ValidationOptions;

  constructor(options?: Partial<ValidationOptions>) {
    this.options = {
      allowedTypes: options?.allowedTypes || Object.values(File.ALLOWED_TYPES),
      maxSize: options?.maxSize || File.MAX_SIZE,
    };
  }

  transform(files: Express.Multer.File[]) {
    if (!files.length) {
      throw new NotFoundException(ErrorCode.FILE_NOT_FOUND);
    }
    files.forEach(({ mimetype, size }) => {
      if (!Object.values(this.options.allowedTypes).includes(mimetype)) {
        throw new UnsupportedMediaTypeException(ErrorCode.INVALID_FILE_FORMAT);
      }
      if (size > this.options.maxSize) {
        throw new PayloadTooLargeException(ErrorCode.FILE_TOO_LARGE);
      }
    });
    return files;
  }
}
