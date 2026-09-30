import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcyxoPn5zh9NkTBqMt-EV0rw7I-GUisJk",
  authDomain: "printit-auth.firebaseapp.com",
  projectId: "printit-auth",
  storageBucket: "printit-auth.firebasestorage.app",
  messagingSenderId: "444174221972",
  appId: "1:444174221972:web:9b7621caba1de8801e6a81",
  measurementId: "G-0BRCQQVCPK"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
