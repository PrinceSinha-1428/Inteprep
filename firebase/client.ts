import { initializeApp, getApp,getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWNKH9NZfoB8ZbO_Hy0RE_uz-ZIoGIqtI",
  authDomain: "inteprep.firebaseapp.com",
  projectId: "inteprep",
  storageBucket: "inteprep.firebasestorage.app",
  messagingSenderId: "244571041981",
  appId: "1:244571041981:web:6360ff98c99e784d7f07d4",
  measurementId: "G-7Y08LSWT8P"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app)
