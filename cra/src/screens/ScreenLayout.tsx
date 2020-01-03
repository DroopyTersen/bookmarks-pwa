import React, { ReactNode, useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { IonContent, IonPage } from "@ionic/react";
import AppHeader from "app/AppHeader";
import MenuWrapper from "navigation/MenuWrapper";
import Footer, { FooterCommand, useFooterCommands } from "app/Footer";
import { SearchBox } from "components/primitives/Forms";

export interface ScreenLayoutProps {
  // props
  title?: string;
  className?: string;
  backUrl?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
  [key: string]: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  className = "",
  title = "Boomarker",
  backUrl = "",
  hideHeader = false,
  hideFooter = false,
  ...rest
}) => {
  useFooterCommands([]);
  return (
    <>
      <StyledPage className="screen">
        {!hideHeader && <AppHeader backUrl={backUrl} title={title} />}
        <StyledContent fullscreen={true}>{children}</StyledContent>
        <div id="footer-portal"></div>
        {!hideFooter && <Footer />}
      </StyledPage>
    </>
  );
};
export default ScreenLayout;

export const StyledPage = styled(IonPage)`
  /* background: linear-gradient(-13deg, #efc75e 10%, #e2574c 75%);
  --ion-background-color: transparent;
  --ion-text-color: var(--white); */
  /* --ion-border-color: rgba(255, 255, 255, 0.3); */
  ion-header.header-md:after {
    display: none;
  }
`;
export const StyledContent = styled(IonContent)`
  /* padding-bottom: 60px; */
  --offset-bottom: 100px;
  --padding-bottom: 50px;
  /* max-width: 1000px; */

  /* background: linear-gradient(0deg, #528ba0, #e2574c); */
  /* background: linear-gradient(-13deg, #efc75e 10%, #e2574c 90%);
  --ion-background-color: transparent; */
`;
