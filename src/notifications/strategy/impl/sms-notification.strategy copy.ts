import { NotificationStrategy } from '../notification.strategy';

export class SmsNotificationStrategy implements NotificationStrategy {
  async notify(recipient: string, message: string): Promise<void> {
    console.log(`Sending SMS to ${recipient} with message: ${message}`);
    // Integrate your SMS service here (e.g., Twilio, Nexmo, etc.)
  }
}
