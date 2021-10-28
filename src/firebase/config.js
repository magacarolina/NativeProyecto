// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import app from 'firebase/app';
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBNWH9BBLUIAEVvnPumnmgGdh-ze6uHy0",
  authDomain: "nativeproyecto.firebaseapp.com",
  projectId: "nativeproyecto",
  storageBucket: "nativeproyecto.appspot.com",
  messagingSenderId: "58915979273",
  appId: "1:58915979273:web:05c64c916d526ce7e0b8d8"
};

// Initialize Firebase


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();