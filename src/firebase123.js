// src/firebase.js
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDAxqzZLvyW64VLMhvxTxQjMubdntruWE0",
    authDomain: "cse110firebase-498ba.firebaseapp.com",
    databaseURL: "https://cse110firebase-498ba.firebaseio.com",
    projectId: "cse110firebase-498ba",
    storageBucket: "",
    messagingSenderId: "155811445994"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;
