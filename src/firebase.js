// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, sendSignInLinkToEmail } from 'firebase/auth'
// import * as firebase from 'firebase'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAct1W9h3kiLvD-_vMMWh-UUSRKTfsL-Qw",
  authDomain: "ecommerce-aa733.firebaseapp.com",
  projectId: "ecommerce-aa733",
  storageBucket: "ecommerce-aa733.appspot.com",
  messagingSenderId: "518241662175",
  appId: "1:518241662175:web:4d6b84efe322569d3e656a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// eport
export const auth = getAuth(app);
// export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAct1W9h3kiLvD-_vMMWh-UUSRKTfsL-Qw",
//   authDomain: "ecommerce-aa733.firebaseapp.com",
//   projectId: "ecommerce-aa733",
//   storageBucket: "ecommerce-aa733.appspot.com",
//   messagingSenderId: "518241662175",
//   appId: "1:518241662175:web:4d6b84efe322569d3e656a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = app.auth()
// export const googleAuthProvider = new app.auth.googleAuthProvider()