export interface NotificationStrategy {
  notify(recipient: string, message: string): Promise<void>;
}
