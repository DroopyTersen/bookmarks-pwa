import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonThumbnail,
  IonTitle,
  IonBackButton,
  IonPage,
  IonFooter,
  IonButton,
} from "@ionic/react";
import AppHeader from "app/AppHeader";
import Icon from "components/primitives/Icon";
import useNavigation from "navigation/useNavigation";
import MenuWrapper, { useMenu } from "navigation/MenuWrapper";

const CLASS_NAME = "screen";

export interface ScreenLayoutProps {
  // props
  title?: string;
  className?: string;
  backUrl?: string;
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
  console.log("RENDERING", title);
  let { navigate } = useNavigation();
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <>
      <MenuWrapper>
        <StyledPage>
          {!hideHeader && <AppHeader backUrl={backUrl} title={title} />}
          <StyledContent fullscreen={true}>
            {/* <SuspenseWithPerf traceId="screen-content" fallback={"Loading..."}> */}
            {children}
            {/* </SuspenseWithPerf> */}
          </StyledContent>
          <Footer />
        </StyledPage>
      </MenuWrapper>
    </>
  );
};

function Footer() {
  let menu = useMenu();
  let { navigate } = useNavigation();

  return (
    <StyledFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={menu.toggleOpen}>
            <Icon name="menu"></Icon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="end" onClick={() => navigate("/new")}>
          <IonButton fill="outline">+ New</IonButton>
        </IonButtons>
      </IonToolbar>
    </StyledFooter>
  );
}
export default ScreenLayout;

const StyledFooter = styled(IonFooter)`
  z-index: 2;
  background: var(--accent-500);
  color: var(--accent-500);
  --ion-toolbar-background: var(--accent-500);
  --ion-toolbar-color: var(--primary-500);
`;
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
