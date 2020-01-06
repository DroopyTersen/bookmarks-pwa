import React, { useState, useEffect } from "react";
import ScreenLayout from "./ScreenLayout";
import useLocation from "hooks/useLocation";
import BookmarkForm from "Bookmarks/BookmarkForm/BookmarkForm";
import BookmarksApi, { Bookmark } from "Bookmarks/BookmarksApi";
import { useFirebase } from "fire/useFirebase";
import { CollectionsApi } from "Collections/CollectionsApi";
import useAsyncData from "hooks/useAsyncData";

export default function BookmarkFormScreen({ title = "New Bookmark", id = "", ...rest }) {
  let { db, currentUser } = useFirebase();
  let api = new BookmarksApi(db, currentUser);
  let [initial, setInitial] = useState(null);

  useEffect(() => {
    let isMounted = true;
    try {
      if (id) {
        api
          .getByKey(id)
          .then((bookmark) => {
            if (isMounted) {
              if (!bookmark) throw new Error("Unable to find Bookmark:" + id);
              setInitial(bookmark);
            }
          })
          .catch((err) => setInitial({ title: "" }));
      } else {
        setInitial(getBookmarkFromQueryString(window.location.href));
      }
    } catch (err) {
      setInitial({ image: "/images/bookmark.png", title: "" });
    }
    return () => (isMounted = false);
  }, [id]);

  return (
    <ScreenLayout title={title} backUrl={"back"}>
      {!initial && <div>Loading...</div>}
      {!!initial && <BookmarkForm bookmark={initial} />}
    </ScreenLayout>
  );
}

export interface ShareTargetData {
  title?: string;
  description?: string;
  url?: string;
}

const makeApiFunc = (api: CollectionsApi) => (id) => getInitialBookmark(id, api);

const getInitialBookmark = async function(id, api: CollectionsApi) {
  try {
    if (id) {
      let bookmark = await api.getByKey(id);
      if (!bookmark) throw new Error("Unable to find Bookmark:" + id);
      return bookmark;
    } else {
      return getBookmarkFromQueryString(window.location.href);
    }
  } catch (err) {
    return { image: "/images/bookmark.png", title: "" };
  }
};
const getBookmarkFromQueryString = (url: string) => {
  let shareData = getSharedDataFromQueryString(url);
  let sharedUrl = shareData.url || (checkIsUrl(shareData.description) ? shareData.description : "");
  const parsedUrl = new URL(url);

  let bookmark: Bookmark = {
    collectionKey: parsedUrl.searchParams.get("collection"),
    image: "/images/bookmark.png",
    title: "",
    ...shareData,
    url: sharedUrl,
  };
  return bookmark;
};

const getSharedDataFromQueryString = function(url: string): ShareTargetData {
  const parsedUrl = new URL(url);
  return {
    title: parsedUrl.searchParams.get("title"),
    url: parsedUrl.searchParams.get("url"),
    description: "",
    // description: parsedUrl.searchParams.get("description"),
  };
};

const checkIsUrl = function(str: string) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  return urlRegex.test(str);
};
