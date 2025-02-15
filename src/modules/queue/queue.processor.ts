import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { JobName } from './job-name.enum';

@Processor()
export class QueueProcessor {
  @Process(JobName.Upload)
  handleUpload({ data }: Job<Express.Multer.File>) {
    data.buffer = Buffer.from(data.buffer as any, 'base64');
    // eslint-disable-next-line no-console
    console.log(data);
  }
}
