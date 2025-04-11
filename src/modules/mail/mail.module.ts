import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { MailService } from './mail.service';

@Module({
  providers: [GmailService, MailService],
  exports: [MailService],
})
export class MailModule {}
