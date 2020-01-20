import React from "react";
import ScreenLayout from "./ScreenLayout";
import styled from "styled-components";
import Splash from "components/Splash/Splash";
import LoginForm from "auth/LoginForm";
import { useUser } from "reactfire";
import UserDetails from "auth/UserDetails";

function ProfileScreen({ ...rest }) {
  let user: firebase.User = useUser();
  return (
    <ScreenLayout title="Profile" backUrl="/">
      <UserDetails user={user} />
    </ScreenLayout>
  );
}

export default React.memo(ProfileScreen);
