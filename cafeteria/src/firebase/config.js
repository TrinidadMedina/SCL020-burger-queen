import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAhYin1aDm6gMh6dSJpVEkG_ENLS4WQnko",
    authDomain: "cafe-1e358.firebaseapp.com",
    projectId: "cafe-1e358",
    storageBucket: "cafe-1e358.appspot.com",
    messagingSenderId: "232481650787",
    appId: "1:232481650787:web:09fcf8983446c1e7e0a056"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const provider = new GoogleAuthProvider(app);
const auth = getAuth(app);

export {
  auth, app, db, provider,
};