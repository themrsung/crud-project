// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYcKPQMIlczBgdij3vkjfx-E5LE8s_Il8",
  authDomain: "infinity-81338.firebaseapp.com",
  projectId: "infinity-81338",
  storageBucket: "infinity-81338.appspot.com",
  messagingSenderId: "1018635074378",
  appId: "1:1018635074378:web:900e1364cf941a8cb75fb3",
  measurementId: "G-X9XBCDXL5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);