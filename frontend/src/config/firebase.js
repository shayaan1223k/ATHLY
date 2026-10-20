import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Client SDK Configuration for ATHLY
 *
 * Reads client credentials from Vite environment variables (VITE_FIREBASE_*).
 * In unconfigured development or preview environments, falls back gracefully without
 * crashing the application so that offline/demo modes remain fully functional.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const hasValidConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'your_firebase_api_key_here' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'your-project-id'
);

let app = null;
let auth = null;

if (hasValidConfig) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.info('[ATHLY FIREBASE] Client SDK initialized successfully with project:', firebaseConfig.projectId);
  } catch (error) {
    console.warn('[ATHLY FIREBASE] Initialization error, falling back to offline mode:', error.message);
    app = null;
    auth = null;
  }
} else {
  console.info(
    '[ATHLY FIREBASE] Client credentials not detected or using placeholders. Running in local simulation/preview mode.'
  );
}

export const isFirebaseConfigured = Boolean(app && auth);
export { app, auth, firebaseConfig };
