import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBn2Bpkk92MeRZRwTVQ7k7NBZG_MdjjcA0",
  authDomain: "controle-de-financas-73491.firebaseapp.com",
  projectId: "controle-de-financas-73491",
  storageBucket: "controle-de-financas-73491.appspot.com",
  messagingSenderId: "420241710399",
  appId: "1:420241710399:web:68608abd420069f585078a",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
