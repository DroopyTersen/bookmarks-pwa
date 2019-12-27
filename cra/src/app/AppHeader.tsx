import React from "react";
import styled from "styled-components";
import { IonHeader, IonToolbar, IonButtons, IonTitle, IonFooter } from "@ionic/react";
import BackButton from "navigation/BackButton";
import { title } from "process";

const CLASS_NAME = "app-header";

export interface AppHeaderProps {
  // props
  title: string;
  showBack: Boolean;
  backFallback: string;
  className?: string;
  [key: string]: any;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  children,
  className = "",
  showBack = true,
  backFallback = "/",
  title = "Bookmarker",
  ...rest
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonButtons slot="start">
          {showBack && <BackButton fallback={backFallback} />}
          {/* <IonThumbnail>
          <img src="/images/icons/icon-72x72.png" />
        </IonThumbnail> */}
        </IonButtons>
        <CenteredTitle>{title}</CenteredTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default React.memo(AppHeader);

const StyledAppHeader = styled.div`
  position: relative;
  display: inline-block;
`;

const CenteredTitle = styled(IonTitle)`
  width: 100%;
  position: absolute;
  left: 0;
  text-align: center;
  top: 0;
  bottom: 0;
`;
