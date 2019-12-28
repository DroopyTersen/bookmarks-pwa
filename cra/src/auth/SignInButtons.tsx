import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useAuth } from "reactfire";

export default function SignInButtons({}) {
  const auth = useAuth();
  console.log(auth);
  const uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      auth.GoogleAuthProvider.PROVIDER_ID,
      auth.FacebookAuthProvider.PROVIDER_ID,
      {
        provider: "microsoft.com",
        loginHintKey: "login_hint",
      },
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  };

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth()} />;
}
