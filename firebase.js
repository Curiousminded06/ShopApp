// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeng9PFdCwg2MgI8b0luj1nGeIAHK2epc",
  authDomain: "shopapp-13313.firebaseapp.com",
  projectId: "shopapp-13313",
  storageBucket: "shopapp-13313.appspot.com",
  messagingSenderId: "219242395987",
  appId: "1:219242395987:web:c85877a95a710db87849a6",
  measurementId: "G-92H0F9DQB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
