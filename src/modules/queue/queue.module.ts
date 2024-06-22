import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { REDIS_HOST, REDIS_PORT } from '~/common/constants';
import { QueueController } from './queue.controller';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';

@Module({
  imports: [
    BullModule.registerQueue({
      // name: 'default',
      redis: {
        host: REDIS_HOST,
        port: REDIS_PORT,
      },
    }),
  ],
  controllers: [QueueController],
  providers: [QueueProcessor, QueueService],
})
export class QueueModule {}
