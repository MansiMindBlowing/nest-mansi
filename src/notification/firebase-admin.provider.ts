// import * as admin from 'firebase-admin';

// export const firebaseAdminProvider = {
//   provide: 'FIREBASE_ADMIN',
//   useFactory: () => {
//     const defaultApp = admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.PROJECT_ID,
//         clientEmail: process.env.CLIENT_EMAIL,
//         privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
//       }),
//     });
//     return { defaultApp };
//   },
// };

import * as admin from 'firebase-admin';
import * as serviceAccount from '../config/firebase-service-account.json';
// import * as serviceAccount from '../config/'

export const firebaseAdminProvider = {
  provide: 'FIREBASE_ADMIN',
  useFactory: () => {
    return admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  },
};
