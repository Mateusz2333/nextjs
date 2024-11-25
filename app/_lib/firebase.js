import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC5bjp4se8FKeCpo5PjGQ_exxvV_gLlZNc",
  authDomain: "nextjs-15dbb.firebaseapp.com",
  projectId: "nextjs-15dbb",
  storageBucket: "nextjs-15dbb.firebasestorage.app",
  messagingSenderId: "894901292332",
  appId: "1:894901292332:web:7567651632611aef6e7089",
  measurementId: "G-RNW3E4GFM1"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };
