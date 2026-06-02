import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length > 0) return getApps()[0];

  

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = Buffer.from(
    process.env.FIREBASE_ADMIN_PRIVATE_KEY!,
    "base64"
  ).toString("utf-8");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Missing Firebase Admin env vars");
  }

  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
}

export const adminDb = getFirestore(getAdminApp());