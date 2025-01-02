import { NotificationStrategy } from './strategy/notification.strategy';

export class NotificationContext {
  private strategy: NotificationStrategy;

  constructor(strategy: NotificationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: NotificationStrategy) {
    this.strategy = strategy;
  }

  async executeNotification(recipient: string, message: string): Promise<void> {
    await this.strategy.notify(recipient, message);
  }
}
