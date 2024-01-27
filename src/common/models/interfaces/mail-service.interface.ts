export interface IMailService {
  send(
    recipients: string | string[],
    template:
      | { subject: string; content: string; attachments?: any[] }
      | { id: string; data: Record<string, any>; attachments?: any[] },
  ): any;
}
