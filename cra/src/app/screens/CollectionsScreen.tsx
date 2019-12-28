import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import NewCollectionFab from "Collections/NewCollectionFab";

function CollectionsScreen({ ...rest }) {
  return (
    <ScreenLayout title="Collections">
      <CollectionsList />
      <NewCollectionFab />
    </ScreenLayout>
  );
}

export default React.memo(CollectionsScreen);
