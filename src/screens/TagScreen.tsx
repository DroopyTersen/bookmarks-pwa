import React, { useEffect } from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import useCollections from "Collections/useCollections";
import { IonTitle } from "@ionic/react";
import BookmarksList from "Bookmarks/BookmarksList";
import NewBookmarkFab from "Bookmarks/NewBookmarkFab";
import useNavigation from "navigation/useNavigation";
import { useFooterCommands } from "app/Footer";

function TagScreen({ tag = "BLANK", ...rest }) {
  let { navigate } = useNavigation();
  let { set: setFooterCommands } = useFooterCommands();
  useEffect(() => {
    let cmd = {
      text: "+ Bookmark",
      onClick: () => navigate("/bookmarks/new?tag=" + tag),
    };
    setFooterCommands([cmd]);
  }, [setFooterCommands]);

  return (
    <ScreenLayout title={tag.toUpperCase()} backUrl={"back"}>
      <BookmarksList tag={tag} />
      {/* <NewBookmarkFab collection={collection.key} /> */}
    </ScreenLayout>
  );
}

export default React.memo(TagScreen);
