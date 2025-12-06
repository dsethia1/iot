import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDr8kh8Y38APai7zD1ypa3gANZTNWmnG2A",
  authDomain: "iot-studyspace.firebaseapp.com",
  databaseURL: "https://iot-studyspace-default-rtdb.firebaseio.com",
  projectId: "iot-studyspace",
  storageBucket: "iot-studyspace.firebasestorage.app",
  messagingSenderId: "216512044657",
  appId: "1:216512044657:web:fb65244e9355cbfbf0c5d0",
};

const app = initializeApp(firebaseConfig);
export const rtdb = getDatabase(app);
