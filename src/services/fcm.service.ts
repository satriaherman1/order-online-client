import { messaging } from "@src/config/firebase";
import { getToken, onMessage } from "firebase/messaging";

// request FCM token
export const requestForToken = async (): Promise<string | null> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("Notification permission not granted");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey:
        "BJhTi16jlhCMrzWmg9wtnGPpGZiOeeF6vyGVxOKzJ3IVSkYLAE8hpKn-0oQcyF_3nhsT2uEbMWbMGpEQlDVo9VE",
    });

    if (token) {
      return token;
    } else {
      console.warn("No FCM token received");
      return null;
    }
  } catch (error) {
    console.error("Error requesting FCM token:", error);
    return null;
  }
};

// listen Message from backend
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("[FCM Foreground] Message received:", payload);
      resolve(payload);
    });
  });
