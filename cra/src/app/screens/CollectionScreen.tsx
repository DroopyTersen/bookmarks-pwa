import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import useCollections from "Collections/useCollections";
import { IonTitle } from "@ionic/react";

function CollectionScreen({ slug = "", ...rest }) {
  let { items } = useCollections();
  let collection = items.find((c) => c.slug === slug);
  if (!collection) return null;
  return (
    <ScreenLayout title={collection.title} backFallback={"/collections"}>
      <IonTitle>I am a the {collection.title} collection</IonTitle>
    </ScreenLayout>
  );
}

export default React.memo(CollectionScreen);
