// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlxUhanRXeqSHN6xxjO1UFmLs19oFK6AI",
  authDomain: "first-project-f61dc.firebaseapp.com",
  projectId: "first-project-f61dc",
  storageBucket: "first-project-f61dc.appspot.com",
  messagingSenderId: "418434244619",
  appId: "1:418434244619:web:9492a752f60e264b1b270e",
  measurementId: "G-N1NHKWJ1WL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
