import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFU60iZLMiBLqqY1ef0Xp5-Fq-hTKn3KM",
  authDomain: "business-directory-84b21.firebaseapp.com",
  projectId: "business-directory-84b21",
  storageBucket: "business-directory-84b21.appspot.com",
  messagingSenderId: "398592095049",
  appId: "1:398592095049:web:cc7246b9329d8c59b6e098",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
