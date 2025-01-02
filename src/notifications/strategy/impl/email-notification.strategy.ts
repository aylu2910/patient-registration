import { NotificationStrategy } from '../notification.strategy';

export class EmailNotificationStrategy implements NotificationStrategy {
  async notify(recipient: string, message: string): Promise<void> {
    console.log(`Sending email to ${recipient} with message: ${message}`);
    // Integrate your email service here (e.g., Mailtrap, Nodemailer, etc.)
  }
}
