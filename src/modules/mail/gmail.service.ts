import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { GMAIL_HOST, GMAIL_PASS, GMAIL_USER } from '~/common/constants';
import { ErrorCode } from '~/common/enums';
import { IMailService } from '~/common/models';

@Injectable()
export class GmailService implements IMailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: GMAIL_HOST,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
  }

  async send(
    recipients: string | string[],
    template: { subject: string; content: string; attachments?: Attachment[] },
  ) {
    try {
      await this.transporter.sendMail({
        to: recipients,
        subject: template.subject,
        html: template.content,
        attachments: template.attachments, // [{ content: file.buffer, filename: file.originalname }],
      });
    } catch (error) {
      if (error.message === 'No recipients defined') {
        throw new BadRequestException(ErrorCode.INVALID_EMAIL_ADDRESS);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
