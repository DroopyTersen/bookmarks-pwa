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
} from "@ionic/react";
import CollectionsList from "Collections/CollectionsList";
import { SuspenseWithPerf } from "reactfire";
import BackButton from "navigation/BackButton";
import AppHeader from "app/AppHeader";

const CLASS_NAME = "screen";

export interface ScreenLayoutProps {
  // props
  title: string;
  className?: string;
  showBack?: Boolean;
  backFallback?: string;

  [key: string]: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  className = "",
  title = "Boomarker",
  showBack = true,
  backFallback = "/",
  ...rest
}) => {
  console.log("RENDERING", title);
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <>
      <StyledPage>
        <AppHeader showBack={showBack} backFallback={backFallback} title={title} />
        <StyledContent fullscreen={true}>
          {/* <SuspenseWithPerf traceId="screen-content" fallback={"Loading..."}> */}
          {children}
          {/* </SuspenseWithPerf> */}
        </StyledContent>
      </StyledPage>
    </>
  );
};

export default ScreenLayout;

export const StyledPage = styled(IonPage)`
  background: linear-gradient(-13deg, #efc75e 10%, #e2574c 75%);
  --ion-background-color: transparent;
  --ion-text-color: var(--white);
  ion-header.header-md:after {
    display: none;
  }
`;
const StyledContent = styled(IonContent)`
  /* background: linear-gradient(0deg, #528ba0, #e2574c); */
  /* background: linear-gradient(-13deg, #efc75e 10%, #e2574c 90%);
  --ion-background-color: transparent; */
`;
