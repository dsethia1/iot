// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr8kh8Y38APai7zD1ypa3gANZTNWmnG2A",
  authDomain: "iot-studyspace.firebaseapp.com",
  databaseURL: "https://iot-studyspace-default-rtdb.firebaseio.com",
  projectId: "iot-studyspace",
  storageBucket: "iot-studyspace.firebasestorage.app",
  messagingSenderId: "216512044657",
  appId: "1:216512044657:web:fb65244e9355cbfbf0c5d0",
  measurementId: "G-FHDT33LXQ1"
};

// Initialize Firebase
// Initialize app (avoid multiple in hot-reload environments)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics may fail in some environments (server/Expo web worker); ignore
}

// Exports expected by other modules
export const auth = getAuth(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);

// Enable offline persistence for Firestore where supported (web)
try {
  enableIndexedDbPersistence(db).catch(() => {});
} catch (e) {
  // ignore failures on unsupported platforms
}

export default { app, analytics, auth, db, rtdb };