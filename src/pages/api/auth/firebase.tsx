import { initializeApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithCustomToken as firebaseSignInWithCustomToken } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db = getDatabase(app);
export const auth = getAuth(app);
export async function loginWithCustomToken(customToken: string) {
  try {
    // Sign in using the custom token
    const userCredential = await firebaseSignInWithCustomToken(auth, customToken);
    const user = userCredential.user;

    // User is now logged in!
    console.log("User logged in:", user, user.uid, user.displayName, user.email);

  } catch (error) {
    console.error("Error logging in:", error);
    // Handle login errors appropriately (e.g., display an error message)
  }
}