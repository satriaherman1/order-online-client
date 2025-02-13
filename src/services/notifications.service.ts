import {
  PushNotificationPayload,
  SilentNotificationPayload,
} from "@src/types/notifications";

class NotificationsService {
  private baseUrl;
  constructor() {
    this.baseUrl = "https://order-online-server.vercel.app/api";
  }

  async sendPushNotifications(payload: PushNotificationPayload) {
    try {
      const response = await fetch(`${this.baseUrl}/sendPushNotifications`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send push notifications");

      return await response.json();
    } catch (err) {
      throw Error("Cannot Send Push Notifications");
    }
  }

  async sendSilentNotifications(payload: SilentNotificationPayload) {
    try {
      const response = await fetch(`${this.baseUrl}/sendSilentNotifications`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Cannot Send Silent Notifications");

      return await response.json();
    } catch (err) {
      throw Error("Cannot Send Silent Notifications");
    }
  }
}

export default NotificationsService;
