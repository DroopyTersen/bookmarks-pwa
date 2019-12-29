import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import useCollections from "Collections/useCollections";
import { IonTitle } from "@ionic/react";
import BookmarksList from "Bookmarks/BookmarksList";
import NewBookmarkFab from "Bookmarks/NewBookmarkFab";

function CollectionScreen({ slug = "", ...rest }) {
  let { items } = useCollections();
  let collection = items.find((c) => c.slug === slug);
  if (!collection) return null;
  return (
    <ScreenLayout title={collection.title} backUrl={"/collections"}>
      <BookmarksList collectionKey={collection.key} />
      {/* <NewBookmarkFab collection={collection.key} /> */}
    </ScreenLayout>
  );
}

export default React.memo(CollectionScreen);
