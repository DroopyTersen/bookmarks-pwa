import React, { useState, useContext, useMemo, useEffect } from "react";
import { useMenu } from "navigation/MenuWrapper";
import useNavigation from "navigation/useNavigation";
import Icon from "components/primitives/Icon";
import { IonToolbar, IonButtons, IonButton, IonFooter } from "@ionic/react";
import styled from "styled-components";

export interface FooterCommand {
  text: string;
  props?: { [key: string]: any };
}
export interface FooterCommands {
  commands: FooterCommand[];
  controls: FooterCommandControls;
}

export interface FooterCommandControls {
  set: (commands: FooterCommand[]) => void;
  push: (command: FooterCommand) => void;
}

export let FooterCommandsContext = React.createContext<FooterCommand[]>([]);
export let FooterCommandsControllerContext = React.createContext<FooterCommandControls>(null);

export function FooterProvider({ children }) {
  let { commands, controls } = useFooterState();

  return (
    <FooterCommandsContext.Provider value={commands}>
      <FooterCommandsControllerContext.Provider value={controls}>
        {children}
      </FooterCommandsControllerContext.Provider>
    </FooterCommandsContext.Provider>
  );
}
export function useFooter() {
  return useContext(FooterCommandsContext);
}

export function useFooterCommands(commands = []) {
  let footerCommands = useContext(FooterCommandsControllerContext);
  useEffect(() => {
    if (footerCommands) {
      footerCommands.set(commands);
    }
  }, []);

  return footerCommands;
}

export function useFooterState() {
  let [commands, setCommands] = useState<FooterCommand[]>([]);

  let controls = useMemo(() => {
    return {
      set: (commands: FooterCommand[]) => setCommands(commands),
      push: (newCommand: FooterCommand) =>
        setCommands((prevCommands: FooterCommand[]) => {
          return [...prevCommands, newCommand];
        }),
    } as FooterCommandControls;
  }, [setCommands]);

  return { commands, controls };
}

export default function Footer({}) {
  let menu = useMenu();
  let commands = useFooter();
  return (
    <StyledFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={menu.toggleOpen}>
            <Icon name="menu"></Icon>
          </IonButton>
        </IonButtons>
        <IonButtons slot="end">
          {commands.map(({ text, ...props }) => (
            <IonButton fill="outline" {...props} key={text}>
              {text}
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
