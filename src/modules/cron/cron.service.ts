import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_SECOND)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleCron() {}

  @Interval(1000)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  handleInterval() {}
}
