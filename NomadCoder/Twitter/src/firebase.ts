/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBH6W0GlssHKmnxJdSfZqrhAwbUGPp4L-M",
  authDomain: "twitter-clone-54d40.firebaseapp.com",
  projectId: "twitter-clone-54d40",
  storageBucket: "twitter-clone-54d40.appspot.com",
  messagingSenderId: "880374065029",
  appId: "1:880374065029:web:a64f47a2418222229146ec",
  measurementId: "G-C4QHQ9HKBJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
