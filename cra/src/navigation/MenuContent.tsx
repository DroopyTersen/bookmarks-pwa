import React from "react";
import styled from "styled-components";
import useCollections from "Collections/useCollections";
import useNavigation from "./useNavigation";
import { useUser } from "reactfire";
import { IonThumbnail, IonButton, IonItem, IonAvatar } from "@ionic/react";
import Link from "./Link";

export default function MenuContent() {
  let { items: collections } = useCollections();
  let { navigate } = useNavigation();
  let user: firebase.User = useUser();
  return (
    <StyledMenu>
      <Link to="/" className="menu-link">
        <div className="menu-header">
          <IonThumbnail>
            <img src="/images/icons/icon-512x512.png" />
          </IonThumbnail>
          <h1 className="title">Bookmarker</h1>
        </div>
      </Link>
      <div className="section">
        <h2 className="title">Collections</h2>
        {collections.map((collection) => (
          <MenuItem path={`/collections/${collection.slug}`} thumbnail={collection.image}>
            {collection.title}
          </MenuItem>
        ))}
        <IonButton
          onClick={() => navigate("/collections/new")}
          color="light"
          fill="outline"
          expand="block"
          style={{ margin: "16px 0 0 16px" }}
        >
          + New Collection
        </IonButton>
      </div>
      <div className="section">
        <h2 className="title">Settings</h2>
        <MenuItem path="/profile" thumbnail={user.photoURL}>
          Profile
        </MenuItem>
      </div>
    </StyledMenu>
  );
}

const MenuItem = function({ path, children, thumbnail = "" }) {
  let { navigate } = useNavigation();
  return (
    <Link to={path} className="menu-link">
      <IonItem>
        {thumbnail && (
          <StyledThumbnail slot="end">
            <img src={thumbnail} />
          </StyledThumbnail>
        )}
        {children}
      </IonItem>
    </Link>
  );
};

const StyledThumbnail = styled(IonAvatar)`
  border: 2px solid rgba(255, 255, 255, 0.27);
`;
const StyledMenu = styled.div`
  --ion-background-color: transparent;
  --ion-text-color: var(--white);
  --ion-border-color: rgba(255, 255, 255, 0.15);
  /* background: var(--secondary-800);
  background: linear-gradient(-77deg, var(--secondary-800), var(--secondary-600)); */

  display: flex;
  flex-direction: column;
  min-width: 275px;
  height: 100%;
  padding: 10px;
  .menu-header {
    display: flex;
    align-items: center;
    position: relative;
    left: -5px;
    color: var(--white);
    .title {
      font-family: "Slabo 27px";
      font-size: 32px;
      margin: 0 0 0 3px;
    }
  }
  .section {
    margin: 20px 0;
    .title {
      margin: 0;
      font-family: "Slabo 27px";
      font-size: 18px;
      color: var(--accent-100);
    }
  }
  .menu-link {
    text-decoration: none;
  }
  /* color: black; */
  /* background: linear-gradient(-13deg, #2c728c 10%, #528ba0 75%); */
`;
