import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBclbD7eSzMWkSWRHZUyAeEw4YKhL_lXxw",
  authDomain: "orbano-33da3.firebaseapp.com",
  projectId: "orbano-33da3",
  storageBucket: "orbano-33da3.firebasestorage.app",
  messagingSenderId: "865841639490",
  appId: "1:865841639490:web:a99bb9dcdbbe97cd09bddb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getAuth(app);

export { db };