export type PushNotificationPayload = {
  token: string;
  title: string;
  body: string;
  data?: Object;
};
export type SilentNotificationPayload = {
  token: string;

  data?: Object;
};
