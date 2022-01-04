import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0DMaZhqfI67K0iTu1yXw5xAJkJf3hZKU",
    authDomain: "quin-messenger.firebaseapp.com",
    projectId: "quin-messenger",
    storageBucket: "quin-messenger.appspot.com",
    messagingSenderId: "576281223243",
    appId: "1:576281223243:web:ba575bb7dac29d812c2dce",
    measurementId: "G-53ZLGZYPZZ"
  };

const app = initializeApp(firebaseConfig);


 const db = getFirestore(app);
 const auth = getAuth();
 const provider = new GoogleAuthProvider();

 export { db, auth, provider };