import React, { useEffect, useRef } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonContent,
  IonMenuToggle,
} from "@ionic/react";
import useCollections from "Collections/useCollections";
import Link from "./Link";
import styled from "styled-components";

function Menu({ isOpen = false }: MobileMenuProps) {
  let { items } = useCollections();
  let ref = useRef(null);

  useEffect(() => {
    ref.current.open();
  });
  return (
    <>
      <IonMenuToggle></IonMenuToggle>
      <StyledMenu side="start" menuId="nav" type="push" ref={ref}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Bookmarker</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {items.map((collection) => (
              <Link to={"/collections/" + collection.slug}>{collection.title}</Link>
            ))}
          </IonList>
        </IonContent>
      </StyledMenu>
    </>
  );
}

const StyledMenu = styled(IonMenu)`
  --ion-background-color: linear-gradient(-13deg, #2c728c 10%, #528ba0 75%);
  /* background: linear-gradient(-13deg, #2c728c 10%, #528ba0 75%); */
`;
export default React.memo(Menu);

export interface MobileMenuProps {
  isOpen: boolean;
}
