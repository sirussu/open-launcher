export const enum NotificationTypes {
  WARN = 'WARN',
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}

export interface INotification {
  id: string
  type: NotificationTypes
  text: string
  withSystemNotification?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}
