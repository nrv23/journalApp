// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8kyKncB9NMGl_LwCHv7A3tFpQCOs3J4k",
  authDomain: "react-redux-firebase-a5dc0.firebaseapp.com",
  projectId: "react-redux-firebase-a5dc0",
  storageBucket: "react-redux-firebase-a5dc0.appspot.com",
  messagingSenderId: "445173064682",
  appId: "1:445173064682:web:7bdd9c29c67b8190bc0893"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // referencia a la bd de firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}