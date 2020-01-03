import React, { useState } from "react";

import { byCreatedBy } from "fire/firestore.utils";
import orderBy from "lodash/orderBy";
import { useFirebase } from "fire/useFirebase";
import { useFirestoreCollectionData, useFirestoreDocData } from "reactfire";
import BookmarksApi, { Bookmark } from "./BookmarksApi";
import matchSorter from "match-sorter";

export default function useBookmarks({ collection = "", tag = "", text = "" }) {
  let { db, currentUser } = useFirebase();
  let query = byCreatedBy(db, "bookmarks", currentUser);
  let api = new BookmarksApi(db, currentUser);
  let data: Bookmark[] = useFirestoreCollectionData(query);
  // console.log(data, collection);
  if (collection) {
    data = data.filter((b) => b.collectionKey === collection);
  }
  if (tag) {
    data = data.filter((b) => b.tags.includes(tag));
  }
  if (text) {
    data = filterBookmarksByText(data, text);
  }
  return {
    bookmarks: data as Bookmark[],
    remove: api.remove,
  };
}

let filterBookmarksByText = function(bookmarks: Bookmark[], filterText: string) {
  let results = matchSorter(bookmarks, filterText, {
    threshold: matchSorter.rankings.CONTAINS,
    keys: ["title", "description", "tags"],
  });
  return results;
};
// export function useBookmark(id:string) {
//   export default function useBookmarks({ collection = "" }) {
//     let { db, currentUser } = useFirebase();
//     let ref = db.collection("bookmarks").doc(id);
//     useFirestoreDocData(ref)
// })
