/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyAMOvQAqwdBVWn942rEY5YID8z9NtvQwlc',
    authDomain: 'wise-4bb4c.firebaseapp.com',
    projectId: 'wise-4bb4c',
    storageBucket: 'wise-4bb4c.appspot.com',
    messagingSenderId: '1056980953893',
    appId: '1:1056980953893:web:1f9f1399e37e3650a2c8cc',
};

// initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
