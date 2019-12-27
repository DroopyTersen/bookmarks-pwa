import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import useCollections from "Collections/useCollections";
import { IonTitle } from "@ionic/react";
import BookmarksList from "Bookmarks/BookmarksList";

function CollectionScreen({ slug = "", ...rest }) {
  let { items } = useCollections();
  let collection = items.find((c) => c.slug === slug);
  if (!collection) return null;
  return (
    <ScreenLayout title={collection.title} backFallback={"/collections"}>
      <BookmarksList collectionKey={collection.key} />
    </ScreenLayout>
  );
}

export default React.memo(CollectionScreen);
