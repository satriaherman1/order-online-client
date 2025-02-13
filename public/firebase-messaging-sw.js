// Import Firebase dengan importScripts (karena service worker tidak mendukung ES Modules)
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

// Inisialisasi Firebase (pastikan konfigurasi sesuai dengan proyek kamu)
firebase.initializeApp({
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
});

const messaging = firebase.messaging();

// Handle pesan background (Silent Notifications)
messaging.onBackgroundMessage((payload) => {
  console.log("Silent Notification diterima:", payload);

  console.log(payload);
  // Opsional: Tampilkan notifikasi
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});

messaging.onMessage(messaging, (payload) => {
  console.log("Foreground Notification Received", payload);
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event.notification);

  event.notification.close(); // Menutup notifikasi setelah diklik

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          // Jika tab sudah terbuka, fokus ke tab tersebut
          return clientList[0].focus();
        }
        // Jika tidak ada tab terbuka, buka URL baru
        return clients.openWindow("https://order-online-now.web.app"); // Ganti dengan URL tujuan
      })
  );
});
