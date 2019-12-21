import firebaseConfig from "./firebase.config";
import { User } from "../data/interfaces";
import { pick } from "lodash";

export async function initFirebase() {
  // Initialize Firebase
  window.firebase.initializeApp(firebaseConfig);
  window.firebase.analytics();
  return new Promise((resolve, reject) => {
    window.firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        resolve(user);
      } else {
        console.log("No one is signed in");
        return signInWithFirebaseRedirect();
      }
    });
  });
  // return window.firebase?.auth()?.currentUser || signInWithFirebase();
}

export function getDb() {
  return window.firebase.firestore();
}

export function getCurrentUser(): User {
  return pick(window.firebase.auth().currentUser, "uid", "email", "displayName", "photoURL");
}

export function signInWithFirebaseRedirect() {
  let provider = new window.firebase.auth.GoogleAuthProvider();
  window.firebase
    .auth()
    .getRedirectResult()
    .then(function(result) {
      if (result.user) {
        // The signed-in user info.
        console.log("SUCCESS SIGN IN!", result);
        return window.firebase.auth().currentUser;
      } else {
        return window.firebase.auth().signInWithRedirect(provider);
      }
    })
    .catch(function(error) {
      console.log("Unable to get redirect result");
      window.firebase.auth().signInWithRedirect(provider);
      // ...
    });
}

export function signInWithFirebasePopup() {
  let provider = new window.firebase.auth.GoogleAuthProvider();
  window.firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log("SUCCESS SIGN IN!", window.firebase.auth());
      return window.firebase.auth().currentUser;
      // ...
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log("FAILED SIGN IN", error);
      // ...
    });
}

export function ensureAuth() {}
