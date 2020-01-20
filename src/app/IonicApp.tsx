import React, { useEffect } from "react";
import styled from "styled-components";
// import "@ionic/react/css/core.css";
// import "@ionic/react/css/ionic.bundle.css";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";
import { IonApp } from "@ionic/react";
// import "ionicons/dist/esm/ion-icon.entry";

import "ionicons";

const CLASS_NAME = "ionic-app";

export interface IonicAppProps {
  // props
  className?: string;
  [key: string]: any;
}

const IonicApp: React.FC<IonicAppProps> = ({ children, className = "", ...additionalProps }) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  useEffect(() => {
    document.querySelector("html").classList.add("hydrated");
  }, []);
  return (
    <IonApp {...additionalProps} className={cssClass}>
      {children}
    </IonApp>
  );
};

export default IonicApp;

const StyledIonicApp = styled.div`
  position: relative;
  display: inline-block;
`;
