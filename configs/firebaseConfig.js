// /configs/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: "AIzaSyAA76FFI3hj--sBs1Mvl3ksqFWd4YtpTqI",
  authDomain: "four-ea12b.firebaseapp.com",
  projectId: "four-ea12b",
  storageBucket: "four-ea12b.appspot.com",
  messagingSenderId: "781851642439",
  appId: "1:781851642439:web:3bc8dd014501167ad27f62"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export Firebase services
export { db, auth, storage };