import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIeAPO7RErNRu-wc1AEKU6s-85RokRPdA",
  authDomain: "christmas-lights-b6707.firebaseapp.com",
  projectId: "christmas-lights-b6707",
  storageBucket: "christmas-lights-b6707.appspot.com",
  messagingSenderId: "737622132809",
  appId: "1:737622132809:web:ccbe3634ce6b187f515798",
  measurementId: "G-KP8TYN8NES",
};

export const app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
