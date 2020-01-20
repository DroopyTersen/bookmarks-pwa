import React, { StrictMode } from "react";
import "./App.css";
import FirebaseProvider from "fire/FirebaseProvider";
import IonicApp from "./IonicApp";
import { Router } from "@reach/router";
import HomeScreen from "../screens/HomeScreen";
import CollectionsScreen from "../screens/CollectionsScreen";
import CollectionScreen from "screens/CollectionScreen";
import BookmarkFormScreen from "screens/BookmarkFormScreen";
import CollectionFormScreen from "screens/CollectionFormScreen";
import LoginScreen from "screens/LoginScreen";
import ProfileScreen from "screens/ProfileScreen";
import MenuWrapper from "navigation/MenuWrapper";
import styled from "styled-components";
import { IonPage } from "@ionic/react";
import Footer, { FooterCommandsContext, useFooterState, FooterProvider } from "./Footer";
import TagScreen from "screens/TagScreen";

const App: React.FC = () => {
  return (
    // <StrictMode>
    <FirebaseProvider>
      <IonicApp className="App">
        <MenuWrapper>
          <FooterProvider>
            <Router>
              <HomeScreen path="/" default />
              {/* <CollectionsScreen path="/" default /> */}
              <CollectionsScreen path="/collections" />
              <CollectionScreen path="/collections/:slug" />
              <CollectionFormScreen path="/collections/edit/:id" title="Edit Collection" />
              <CollectionFormScreen path="/collections/new" title="New Collection" />
              <BookmarkFormScreen path="/share-target" />
              <BookmarkFormScreen path="/new" />
              <BookmarkFormScreen path="/bookmarks/new" />
              <BookmarkFormScreen path="/bookmarks/edit/:id" title="Edit Bookmark" />
              <TagScreen path="/tags/:tag" />
              <LoginScreen path="/login" />
              <ProfileScreen path="/profile" />
              <ProfileScreen path="/sign-out" />
            </Router>
          </FooterProvider>
        </MenuWrapper>
      </IonicApp>
    </FirebaseProvider>
    // </StrictMode>
  );
};

export const StyledPage = styled(IonPage)`
  /* background: linear-gradient(-13deg, #efc75e 10%, #e2574c 75%);
  --ion-background-color: transparent;
  --ion-text-color: var(--white); */
  /* --ion-border-color: rgba(255, 255, 255, 0.3); */
  ion-header.header-md:after {
    display: none;
  }
`;

export default App;
