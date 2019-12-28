import React from "react";
import ScreenLayout from "./ScreenLayout";
import useLocation from "hooks/useLocation";
import BookmarkForm from "Bookmarks/BookmarkForm/BookmarkForm";
import { Bookmark } from "Bookmarks/BookmarksApi";
import CollectionForm from "Collections/CollectionForm";

export default function CollectionFormScreen({ title = "New Collection", id = "", ...rest }) {
  return (
    <ScreenLayout title={title}>
      <CollectionForm id={id} />
    </ScreenLayout>
  );
}
