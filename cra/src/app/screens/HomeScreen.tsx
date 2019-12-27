import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import { IonTitle } from "@ionic/react";
import Link from "navigation/Link";

function HomeScreen({ ...rest }) {
  return (
    <ScreenLayout title="Bookmarker" showBack={false}>
      <IonTitle>I am the home screen</IonTitle>
      <Link to="/collections">
        <IonTitle>Go to Collections</IonTitle>
      </Link>
    </ScreenLayout>
  );
}

export default React.memo(HomeScreen);
