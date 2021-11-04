import { collection, getDocs, query, where, addDoc } from "@firebase/firestore";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "@firebase/auth";
import { db, auth } from "./App";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "react-firebase-baecd.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: "react-codesandbox-lib",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  let list = [];
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = await query(collection(db, "01"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      list.push(doc);
    });
    if (list.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        location: "",
        books: {}
      });
    }
  } catch (err) {
    console.error(err);
  }
};

export const signInWithEmailPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
      location: "",
      books: {}
    });
  } catch (err) {
    console.error(err);
  }
};

export const sendPswResetEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

export const logout = async () => {
  await signOut(auth);
};
