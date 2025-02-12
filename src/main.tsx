import { requestForToken } from "@src/services/fcm.service.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

requestForToken().then((payload) => console.log(payload));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Mendaftarkan Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", { type: "module" })
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}
