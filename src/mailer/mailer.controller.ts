import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail() {
    const emailDto: SendEmailDto = {
      recipient: 'ayluorellana@gmail.com',
      subject: 'Test email- harcoded',
      html: '<h1>Test email Ore</h1><p>This is a test email</p>',
    };
    return this.mailerService.sendEmail(emailDto);
  }
}
