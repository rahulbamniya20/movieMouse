import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB78wriIYAmi5Owvs2ssfTg24Z4g9RbDwA",
  authDomain: "filmyverse-3283a.firebaseapp.com",
  projectId: "filmyverse-3283a",
  storageBucket: "filmyverse-3283a.appspot.com",
  messagingSenderId: "532207036277",
  appId: "1:532207036277:web:e146a6180380acb0fb153c"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Initialize Firebase Authentication
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

// export default app;