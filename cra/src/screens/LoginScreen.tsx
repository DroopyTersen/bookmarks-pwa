import React from "react";
import ScreenLayout from "./ScreenLayout";
import styled from "styled-components";
import Splash from "components/Splash/Splash";
import LoginForm from "auth/LoginForm";
import useNavigation from "navigation/useNavigation";
import { useUser } from "reactfire";

function LoginScreen({ ...rest }) {
  let user = useUser();
  let { navigate } = useNavigation();
  if (user) {
    navigate("/");
  }
  return (
    <ScreenLayout hideHeader={true}>
      <Splash title="Bookmarker" subtitle="Welcome to" />
      <LoginForm />
    </ScreenLayout>
  );
}

export default React.memo(LoginScreen);
