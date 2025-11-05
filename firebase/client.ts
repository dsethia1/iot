/**
 * Firebase client init. Replace the firebaseConfig object with your project's values
 * from the Firebase console (Project settings -> SDK setup and configuration).
 *
 * Notes:
 * - This file uses the modular Firebase JS SDK which works in Expo web and many RN setups.
 * - If you run into native build issues on bare React Native, consider using
 *   react-native-firebase which requires native installation.
 */
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// TODO: replace these placeholder values with your Firebase project's config
export const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const rtdb = getDatabase();

// Enable offline persistence for Firestore on web where available.
try {
  // enableIndexedDbPersistence returns a Promise; ignore failure in constrained environments
  enableIndexedDbPersistence(db).catch(() => {});
} catch (e) {
  // ignore on native or unsupported environments
}

export default { auth, db, rtdb };
