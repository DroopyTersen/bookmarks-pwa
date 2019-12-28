import React from "react";
import { SuspenseWithPerf, useUser } from "reactfire";
import UserDetails from "./UserDetails";
import SignInButtons from "./SignInButtons";

export default function LoginForm({}) {
  return (
    <SuspenseWithPerf traceId={"firebase-user-wait"} fallback={<p>loading...</p>}>
      <UserDetailsOrSignIn />
    </SuspenseWithPerf>
  );
}

const UserDetailsOrSignIn = () => {
  const user = useUser();
  return user ? <UserDetails user={user as firebase.User} /> : <SignInButtons />;
};
