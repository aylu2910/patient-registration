import { NotificationStrategy } from '../notification.strategy';

export class SmsNotificationStrategy implements NotificationStrategy {
  async notify(recipient: string): Promise<void> {
    console.log(`Sending SMS to ${recipient}`);
    // Integrate SMS service like Twilio for example
  }
}
