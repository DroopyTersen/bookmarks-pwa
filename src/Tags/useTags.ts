import React, { useMemo } from "react";
import useBookmarks from "Bookmarks/useBookmarks";
import flatten from "lodash/flatten";
import uniq from "lodash/uniq";

export default function useTags() {
  let { bookmarks } = useBookmarks({});

  let tags = uniq(flatten(bookmarks.map((b) => b.tags))).sort();
  // console.log("TCL: useTags -> tags", tags, bookmarks);

  return {
    tags,
  };
}

// export function useBookmark(id:string) {
//   export default function useBookmarks({ collection = "" }) {
//     let { db, currentUser } = useFirebase();
//     let ref = db.collection("bookmarks").doc(id);
//     useFirestoreDocData(ref)
// })
