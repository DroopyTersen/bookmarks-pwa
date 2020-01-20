import firebaseConfig from "./firebase.config";
import { pick } from "lodash";

export interface FirebaseUser {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
}

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

export function signInWithFirebaseRedirect() {
  let provider = new window.firebase.auth.GoogleAuthProvider();
  window.firebase
    .auth()
    .getRedirectResult()
    .then(function(result: firebase.auth.UserCredential) {
      if (result.user) {
        // The signed-in user info.
        console.log("SUCCESS SIGN IN!", result);
        return window.firebase.auth().currentUser;
      } else {
        window.firebase.auth().signInWithRedirect(provider);
      }
    })
    .catch(function(error) {
      console.log("Unable to get redirect result", error);
      window.firebase.auth().signInWithRedirect(provider);
      // ...
    });
}

export function ensureAuth() {}
