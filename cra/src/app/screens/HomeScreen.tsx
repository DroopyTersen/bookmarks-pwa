import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import { IonTitle } from "@ionic/react";
import Link from "navigation/Link";
import BookmarksList from "Bookmarks/BookmarksList";

function HomeScreen({ ...rest }) {
  return (
    <ScreenLayout title="Bookmarker" showBack={false}>
      <IonTitle>Collections</IonTitle>
      <CollectionsList />
      <IonTitle>Recent Bookmarks</IonTitle>
      <BookmarksList />
    </ScreenLayout>
  );
}

export default React.memo(HomeScreen);
