import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from './dto/send-email.dto';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {
  constructor(private readonly configService: ConfigService) {}
  mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get('MAIL_PORT'),
      secure: true,
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendEmail(emailDto: SendEmailDto) {
    const transporter = this.mailTransport();

    const options: Mail.Options = {
      from: this.configService.get('DEFAULT_MAIL_FROM'),
      to: emailDto.recipient,
      subject: emailDto.subject,
      html,
    };
    try {
      const res = await transporter.sendMail(options);
      console.log('Email sent: ' + res);
      return res;
    } catch (error) {
      console.log('Error sending email: ' + error);
    }
  }
}
