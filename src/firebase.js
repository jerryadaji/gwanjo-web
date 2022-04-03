// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Kt_xZ88KuTT2vbIHnVr8XnYHVIL_s9k",
  authDomain: "gwanjo-d897e.firebaseapp.com",
  projectId: "gwanjo-d897e",
  storageBucket: "gwanjo-d897e.appspot.com",
  messagingSenderId: "20462307534",
  appId: "1:20462307534:web:280ddd273fbe2c426ca89f",
  measurementId: "G-9BYKHRP6NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage(app);
export default app;