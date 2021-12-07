export interface INotification {
  connect(url: string): void;

  disconnect(): void;
}
