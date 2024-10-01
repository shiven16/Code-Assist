import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = async (name, email, password) => {
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    const user = userCredential.user;
    return user;
  } 
  catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('User already exists. Please use a different email.');
    }
    throw error;
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
