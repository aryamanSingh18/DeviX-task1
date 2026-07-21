import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  onValue,
  onDisconnect,
  set,
  remove,
  serverTimestamp,
} from "firebase/database";

// Firebase config is read from environment variables so real keys are
// never committed to the repo. Create a `.env.local` file (see .env.example)
// with your own project's values from the Firebase console.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let db;

// Guard against crashing the whole app during local development before
// the user has plugged in real Firebase credentials.
try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
} catch (err) {
  console.error(
    "Firebase failed to initialize. Did you set up .env.local? See .env.example.",
    err
  );
}

export { db, ref, push, onValue, onDisconnect, set, remove, serverTimestamp };
