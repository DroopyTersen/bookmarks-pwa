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
      <AppHeader showBack={showBack} backFallback={backFallback} title={title} />
      <StyledContent>
        {/* <SuspenseWithPerf traceId="screen-content" fallback={"Loading..."}> */}
        {children}
        {/* </SuspenseWithPerf> */}
      </StyledContent>
    </>
  );
};

export default ScreenLayout;

const StyledScreenLayout = styled.div``;
const StyledContent = styled.div`
  margin-top: 0px;
`;
