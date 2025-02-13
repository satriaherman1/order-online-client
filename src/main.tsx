import { requestForToken } from "@src/services/fcm.service.ts";
import "@src/styles/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

Notification.requestPermission().then((permission) => {
  console.log("Permission status:", permission);
  if (permission === "granted") {
    console.log("Notifications allowed!");
  } else {
    console.log("Notifications blocked.");
  }
});

requestForToken().then((payload) => {
  if (!payload) return;
  localStorage.setItem("deviceToken", payload);
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Mendaftarkan Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
