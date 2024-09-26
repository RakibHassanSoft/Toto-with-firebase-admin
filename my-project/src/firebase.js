import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDn8dKGLHjZOUudmvdDGfCFpt08ilX7AKQ",
  authDomain: "todo-app-a9cf8.firebaseapp.com",
  projectId: "todo-app-a9cf8",
  storageBucket: "todo-app-a9cf8.appspot.com",
  messagingSenderId: "600833810525",
  appId: "1:600833810525:web:1b04e244a9b124470a2db4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
};
