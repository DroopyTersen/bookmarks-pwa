import React, { ReactNode } from "react";
import styled from "styled-components";
import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "app/AppHeader";
import useNavigation from "navigation/useNavigation";
import MenuWrapper from "navigation/MenuWrapper";
import Footer from "app/Footer";
import { SuspenseWithPerf } from "reactfire";

const CLASS_NAME = "screen";

export interface ScreenLayoutProps {
  // props
  title?: string;
  className?: string;
  backUrl?: string;
  hideHeader?: boolean;
  [key: string]: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  className = "",
  title = "Boomarker",
  backUrl = "",
  hideHeader = false,
  ...rest
}) => {
  return (
    <>
      <MenuWrapper>
        <StyledPage>
          {!hideHeader && <AppHeader backUrl={backUrl} title={title} />}
          <StyledContent fullscreen={true}>{children}</StyledContent>
          <Footer />
        </StyledPage>
      </MenuWrapper>
    </>
  );
};
export default ScreenLayout;

export const StyledPage = styled(IonPage)`
  background: linear-gradient(-13deg, #efc75e 10%, #e2574c 75%);
  --ion-background-color: transparent;
  --ion-text-color: var(--white);
  /* --ion-border-color: rgba(255, 255, 255, 0.3); */
  ion-header.header-md:after {
    display: none;
  }
`;
export const StyledContent = styled(IonContent)`
  /* padding-bottom: 60px; */
  --offset-bottom: 100px;
  --padding-bottom: 50px;
  /* background: linear-gradient(0deg, #528ba0, #e2574c); */
  /* background: linear-gradient(-13deg, #efc75e 10%, #e2574c 90%);
  --ion-background-color: transparent; */
`;
