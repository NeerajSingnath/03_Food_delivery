// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'veingo-31adc.firebaseapp.com',
  projectId: 'veingo-31adc',
  storageBucket: 'veingo-31adc.firebasestorage.app',
  messagingSenderId: '464766053267',
  appId: '1:464766053267:web:8578ee1d716bf6c0b5d666',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };
