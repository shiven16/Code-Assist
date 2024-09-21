import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { auth } from './firebaseConfig';

const db = getFirestore();

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    const user = userCredential.user;

    await setDoc(doc(db, 'users', user.uid), {
      name,
      email,
    });

    return user;
  } 
  catch (error) {
    console.log(error.message);
  }
};

const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      console.log("Successfully signed out");
    } catch (error) {
      console.log("Sign-out error:", error.message);
    }
  };

export { signIn, signUp, signOut };
