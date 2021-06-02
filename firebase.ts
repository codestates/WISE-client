/* eslint-disable import/no-extraneous-dependencies */
import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_apiKey,
    authDomain: process.env.NEXT_PUBLIC_authDomain,
    projectId: process.env.NEXT_PUBLIC_projectId,
    storageBucket: process.env.NEXT_PUBLIC_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_appId,
};

// initialize firebase app
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
// auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
facebookAuthProvider.setCustomParameters({ display: 'popup' });

const getFirebaseToken = () => auth.currentUser?.getIdToken();

export { auth, googleAuthProvider, facebookAuthProvider, getFirebaseToken };
