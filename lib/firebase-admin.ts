import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

export function getAdminDb() {
  if (!app) {
    app = initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: Buffer.from(
          process.env.FIREBASE_ADMIN_PRIVATE_KEY!,
          "base64"
        ).toString("utf-8"),
      }),
    });
  }
  return getFirestore(app);
}
