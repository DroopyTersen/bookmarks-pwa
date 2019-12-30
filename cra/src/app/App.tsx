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

const App: React.FC = () => {
  return (
    // <StrictMode>
    <FirebaseProvider>
      <IonicApp className="App">
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
          <LoginScreen path="/login" />
          <ProfileScreen path="/profile" />
          <ProfileScreen path="/sign-out" />
        </Router>
      </IonicApp>
    </FirebaseProvider>
    // </StrictMode>
  );
};

export default App;
