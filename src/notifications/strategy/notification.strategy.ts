export interface NotificationStrategy {
  notify(recipient: string): Promise<void>;
}
