import type { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let dbPromise: Promise<Firestore | null> | null = null;

/** Lazy-load Firestore only when the contact form needs it. */
export async function getDb(): Promise<Firestore | null> {
  if (typeof window === "undefined" || !firebaseConfig.projectId) {
    return null;
  }

  if (!dbPromise) {
    dbPromise = (async () => {
      const { getApp, getApps, initializeApp } = await import("firebase/app");
      const { getFirestore } = await import("firebase/firestore");
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      return getFirestore(app);
    })();
  }

  return dbPromise;
}

/** @deprecated Use getDb() — kept for type checks only */
export const db = null;
