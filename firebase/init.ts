import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './client';

/**
 * Initialize authentication. Call this once at app startup (for example in Root layout).
 * By default this attempts anonymous sign-in so users get a uid without requiring
 * a sign-up flow. You can replace this with email/password or any other provider.
 */
export function initAuth() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      signInAnonymously(auth).catch((err) => {
        console.warn('Anonymous sign-in failed', err);
      });
    }
  });
}

export default initAuth;
