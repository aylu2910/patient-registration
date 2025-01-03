import { Injectable } from '@nestjs/common';
import { MailerService } from '../../../mailer/mailer.service';
import { NotificationStrategy } from '../notification.strategy';

@Injectable()
export class EmailNotificationStrategy implements NotificationStrategy {
  constructor(private readonly mailerService: MailerService) {}

  async notify(recipient: string): Promise<void> {
    await this.mailerService.sendEmail(recipient);
  }
}
