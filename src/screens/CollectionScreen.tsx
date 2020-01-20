import React, { useEffect } from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import useCollections from "Collections/useCollections";
import { IonTitle } from "@ionic/react";
import BookmarksList from "Bookmarks/BookmarksList";
import NewBookmarkFab from "Bookmarks/NewBookmarkFab";
import useNavigation from "navigation/useNavigation";
import { useFooterCommands } from "app/Footer";

function CollectionScreen({ slug = "", ...rest }) {
  let { items } = useCollections();
  let { navigate } = useNavigation();
  let { set: setFooterCommands } = useFooterCommands();
  let collection = items.find((c) => c.slug === slug);

  useEffect(() => {
    let cmd = {
      text: "+ Bookmark",
      onClick: () => navigate("/bookmarks/new?collection=" + collection?.key),
    };
    setFooterCommands([cmd]);
  }, [setFooterCommands]);

  if (!collection) return null;
  return (
    <ScreenLayout title={collection.title} backUrl={"/collections"}>
      <BookmarksList collectionKey={collection.key} />
      {/* <NewBookmarkFab collection={collection.key} /> */}
    </ScreenLayout>
  );
}

export default React.memo(CollectionScreen);
