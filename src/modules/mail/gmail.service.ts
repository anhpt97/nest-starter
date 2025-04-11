import { Injectable } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';
import { Attachment } from 'nodemailer/lib/mailer';
import { GMAIL_HOST, GMAIL_PASS, GMAIL_USER } from '~/common/constants';
import { IMailService } from '~/common/models';
import { log } from '~/utils';

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
      log(error);
      throw error;
    }
  }
}
