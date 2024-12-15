// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "vision-6656f.firebaseapp.com",
  projectId: "vision-6656f",
  storageBucket: "vision-6656f.appspot.com",
  messagingSenderId: "300362282844",
  appId: "1:300362282844:web:a80d167e27d5ace377b399"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);