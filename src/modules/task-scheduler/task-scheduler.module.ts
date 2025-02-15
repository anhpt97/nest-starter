import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskSchedulerService } from './task-scheduler.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskSchedulerService],
})
export class TaskSchedulerModule {}
