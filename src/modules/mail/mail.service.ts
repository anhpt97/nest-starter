import { Inject, Injectable } from '@nestjs/common';
import { OTP_TTL } from '~/common/constants';
import { IMailService } from '~/common/models';
import { GmailService } from './gmail.service';

@Injectable()
export class MailService {
  constructor(@Inject(GmailService) private mailService: IMailService) {}

  async sendOtp(email: string, payload: { username: string; otp: string }) {
    const { username, otp } = payload;
    await this.mailService.send(email, {
      subject: 'OTP Verification',
      content: `
          Hi, ${username}, your OTP is ${otp}.
          This OTP is valid for ${(OTP_TTL / 60).toString()} minute(s).
        `,
    });
  }

  async sendNewPassword(
    email: string,
    payload: { username: string; newPassword: string },
  ) {
    const { username, newPassword } = payload;
    await this.mailService.send(email, {
      subject: 'Password Reset',
      content: `Hi, ${username}, your new password is ${newPassword}.`,
    });
  }
}
