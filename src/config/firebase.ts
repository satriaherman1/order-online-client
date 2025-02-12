// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpvtXGCDyPEQf-JiF3EX6cw7jGUk8i3r4",
  authDomain: "order-online-now.firebaseapp.com",
  projectId: "order-online-now",
  storageBucket: "order-online-now.firebasestorage.app",
  messagingSenderId: "413470245409",
  appId: "1:413470245409:web:17db126307783cd24ed960",
  measurementId: "G-S0TT3S7FB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };
