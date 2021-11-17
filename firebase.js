import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAGrvuTIHqdGEmxLpoHp8cxlFAEz6w0qvk",
    authDomain: "whatsapp-2-74c54.firebaseapp.com",
    projectId: "whatsapp-2-74c54",
    storageBucket: "whatsapp-2-74c54.appspot.com",
    messagingSenderId: "247203174604",
    appId: "1:247203174604:web:b12075017c7498857a0a69",
    measurementId: "G-747WKJ9M4H"
  };

  const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider}