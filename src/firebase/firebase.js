// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBd6YF0mPAhnwM9fUHMcj-4O3dXgVwmKvw",
  authDomain: "personal-porfolio-5f865.firebaseapp.com",
  projectId: "personal-porfolio-5f865",
  storageBucket: "personal-porfolio-5f865.firebasestorage.app",
  messagingSenderId: "402314085411",
  appId: "1:402314085411:web:1abbfcf9c9185998f1dd96",
  measurementId: "G-7CMPVG8BSE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
