// src/lib/firebase.js
// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase project config
const firebaseConfig = {
   apiKey: "AIzaSyB777Qtknce38_F10Wvnxc_xT-zdAZV5uk",
  authDomain: "birthday-wish-wall-aaa6c.firebaseapp.com",
  projectId: "birthday-wish-wall-aaa6c",
  storageBucket: "birthday-wish-wall-aaa6c.firebasestorage.app",
  messagingSenderId: "487264900790",
  appId: "1:487264900790:web:bf7eb44351959a97653817",
  measurementId: "G-GSR7M0GPSZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
