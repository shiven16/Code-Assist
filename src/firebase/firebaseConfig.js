import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx3BIJtpnqrFIzrdqxSgcjZx9IAgYF-Lo",
  authDomain: "code-assist-581b0.firebaseapp.com",
  projectId: "code-assist-581b0",
  storageBucket: "code-assist-581b0.appspot.com",
  messagingSenderId: "262826048716",
  appId: "1:262826048716:web:de8a8a87e81a5f57bfd669",
  measurementId: "G-LTL7S937HD"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
