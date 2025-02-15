import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { JobName } from './job-name.enum';

@Injectable()
export class QueueService {
  constructor(@InjectQueue() private queue: Queue) {}

  upload(files: Express.Multer.File[]) {
    files.forEach((file) => void this.queue.add(JobName.Upload, file));
  }
}
