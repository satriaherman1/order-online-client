import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyBpvtXGCDyPEQf-JiF3EX6cw7jGUk8i3r4",
  authDomain: "order-online-now.firebaseapp.com",
  projectId: "order-online-now",
  storageBucket: "order-online-now.firebasestorage.app",
  messagingSenderId: "413470245409",
  appId: "1:413470245409:web:17db126307783cd24ed960",
};

// Inisialisasi Firebase di Service Worker
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log("[Firebase Messaging] Received background message", payload);
});
