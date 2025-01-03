import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {
    this.sendEmail = this.sendEmail.bind(this);
  }
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendEmail(recipient) {
    const transporter = this.mailTransport();
    const emailDto: SendEmailDto = {
      recipient: recipient,
      subject: 'Welcome aboad! :)',
      html: `<h1>Thank you so much for registering as our patient.</h1><p>This is just the start of the journey</p>`,
    };

    const options: Mail.Options = {
      from: this.configService.get('DEFAULT_MAIL_FROM'),
      to: emailDto.recipient,
      subject: emailDto.subject,
      html: emailDto.html,
    };
    try {
      await transporter.sendMail(options);
    } catch (error) {
      console.log('Error sending email: ' + error);
    }
  }
}
