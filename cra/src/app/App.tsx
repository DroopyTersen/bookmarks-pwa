import React, { StrictMode } from "react";
import "./App.css";
import FirebaseProvider from "fire/FirebaseProvider";
import CollectionsList from "Collections/CollectionsList";
import IonicApp from "./IonicApp";
import HomeScreen from "./screens/HomeScreen";
import CollectionsScreen from "./screens/CollectionsScreen";
import { Router } from "@reach/router";

import {
  IonContent,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonImg,
  IonThumbnail,
  IonButtons,
} from "@ionic/react";
import CollectionScreen from "./screens/CollectionScreen";

const App: React.FC = () => {
  return (
    // <StrictMode>
    <FirebaseProvider>
      <IonicApp className="App">
        <Router>
          <HomeScreen path="/" default />
          <CollectionsScreen path="/collections" />
          <CollectionScreen path="/collections/:slug" />
        </Router>
      </IonicApp>
    </FirebaseProvider>
    // </StrictMode>
  );
};

export default App;
