import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdminApp(): App {
  const apps = getApps();
  if (apps.length > 0) return apps[0];

  return initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_CLIENT_EMAIL?.replace(/\\n/g, "\n"),
    }),
  });
}

export const adminDb = getFirestore(getFirebaseAdminApp());