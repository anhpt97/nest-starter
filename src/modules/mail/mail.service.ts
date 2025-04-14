import { Inject, Injectable } from '@nestjs/common';
import { IMailService } from '~/common/models';
import { GmailService } from './gmail.service';

@Injectable()
export class MailService {
  constructor(@Inject(GmailService) private mailService: IMailService) {}

  async sendNewPasswordNotification(
    email: string,
    { username, newPassword }: { username: string; newPassword: string },
  ) {
    await this.mailService.send(email, {
      subject: 'Password Reset',
      content: `Hi, ${username}! Your new password is ${newPassword}.`,
    });
  }
}
