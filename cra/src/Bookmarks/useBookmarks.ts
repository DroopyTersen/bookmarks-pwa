import React from "react";

import { byCreatedBy } from "fire/firestore.utils";
import orderBy from "lodash/orderBy";
import { useFirebase } from "fire/useFirebase";
import { useFirestoreCollectionData } from "reactfire";
import { Bookmark } from "./BookmarksApi";
export default function useBookmarks({ collection = "" }) {
  let { db, currentUser } = useFirebase();
  let query = byCreatedBy(db, "bookmarks", currentUser);

  let data: Bookmark[] = useFirestoreCollectionData(query);
  console.log(data, collection);
  if (collection) {
    data = data.filter((b) => b.collectionKey === collection);
  }
  return {
    bookmarks: data as Bookmark[],
  };
}
