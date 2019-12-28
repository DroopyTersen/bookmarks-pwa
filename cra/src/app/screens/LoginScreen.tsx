import React from "react";
import ScreenLayout, { StyledPage, StyledContent } from "./ScreenLayout";
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
    <StyledPage>
      <StyledContent>
        <Splash title="Bookmarker" subtitle="Welcome to" />
        <LoginForm />
      </StyledContent>
    </StyledPage>
  );
}

export default React.memo(LoginScreen);
