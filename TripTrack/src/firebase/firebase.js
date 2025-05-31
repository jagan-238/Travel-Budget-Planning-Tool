import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWoalk1LmrdNdngG_jCA2wzDu0_rxR6Oc",
  authDomain: "web-b43.firebaseapp.com",
  databaseURL: "https://web-b43-default-rtdb.firebaseio.com",
  projectId: "web-b43",
  storageBucket: "web-b43.firebasestorage.app",
  messagingSenderId: "1043699448922",
  appId: "1:1043699448922:web:75aca8f58416f651e4ec63",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// Sign in anonymously helper
export const signInAnon = () => signInAnonymously(auth);

// Auth state change listener helper
export const onAuthState = (callback) => onAuthStateChanged(auth, callback);
