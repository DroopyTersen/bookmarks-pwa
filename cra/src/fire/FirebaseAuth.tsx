import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { SuspenseWithPerf, useUser, useAuth, useDatabase } from "reactfire";

const signOut = (auth) =>
  auth()
    .signOut()
    .then(() => console.log("signed out"));

const UserDetails = ({ user }) => {
  const auth = useAuth();

  return (
    <>
      <h3>Displayname: {user.displayName}</h3>
      <h3>Providers:</h3>
      <ul>
        {user.providerData.map((profile) => (
          <li key={profile.providerId}>{profile.providerId}</li>
        ))}
      </ul>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </>
  );
};

const SignInForm = () => {
  const auth = useAuth();

  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
};

const FirebaseAuthStateButton = () => {
  const user = useUser();
  let db = useDatabase();
  return user ? <UserDetails user={user} /> : <SignInForm />;
};

export const AuthButton = () => {
  return (
    <SuspenseWithPerf traceId={"firebase-user-wait"} fallback={<p>loading...</p>}>
      <FirebaseAuthStateButton />
    </SuspenseWithPerf>
  );
};
