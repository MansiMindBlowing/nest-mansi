import * as admin from 'firebase-admin';

export const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    // You can keep these console.logs for debugging
    console.log('FIREBASE_PROJECT_ID from ENV:', process.env.project_id);
    console.log('FIREBASE_CLIENT_EMAIL from ENV:', process.env.client_email);
    console.log('FIREBASE_PRIVATE_KEY from ENV:', process.env.private_key?.substring(0, 20));

    const defaultApp = admin.initializeApp({
      credential: admin.credential.cert({
        // 🚨 THIS IS THE CORRECTED CODE 🚨
        projectId: process.env.project_id,
        clientEmail: process.env.client_email,
        privateKey: process.env.private_key?.replace(/\\n/g, '\n'),
      }),
    });
    return  defaultApp ;
  },
};