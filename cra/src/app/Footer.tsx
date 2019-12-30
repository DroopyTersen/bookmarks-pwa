import React, { useState, useContext } from "react";
import { useMenu } from "navigation/MenuWrapper";
import useNavigation from "navigation/useNavigation";
import Icon from "components/primitives/Icon";
import { IonToolbar, IonButtons, IonButton, IonFooter } from "@ionic/react";
import styled from "styled-components";

export interface FooterCommand {
  text: string;
  onClick: () => void;
}
export default function Footer({ commands }: { commands: FooterCommand[] }) {
  let menu = useMenu();

  return (
    <StyledFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={menu.toggleOpen}>
            <Icon name="menu"></Icon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          {commands.map((command) => (
            <IonButton fill="outline" onClick={command.onClick}>
              {command.text}
            </IonButton>
          ))}
        </IonButtons>
      </IonToolbar>
    </StyledFooter>
  );
}

const StyledFooter = styled(IonFooter)`
  z-index: 2;
  background: var(--accent-500);
  color: var(--accent-500);
  --ion-toolbar-background: var(--accent-500);
  --ion-toolbar-color: var(--primary-500);
`;
