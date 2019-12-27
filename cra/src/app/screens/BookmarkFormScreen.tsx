import React from "react";
import ScreenLayout from "./ScreenLayout";
import useLocation from "hooks/useLocation";
import BookmarkForm from "Bookmarks/BookmarkForm/BookmarkForm";
import { Bookmark } from "Bookmarks/BookmarksApi";

export default function BookmarkFormScreen({ title = "New Bookmark", id = "", ...rest }) {
  let location = useLocation();
  let initialBookmark = getBookmarkFromQueryString(location.href);
  return (
    <ScreenLayout title={title}>
      <BookmarkForm bookmark={initialBookmark} />
    </ScreenLayout>
  );
}

export interface ShareTargetData {
  title?: string;
  description?: string;
  url?: string;
}

const getBookmarkFromQueryString = (url: string) => {
  let shareData = getSharedDataFromQueryString(url);
  let sharedUrl = shareData.url || (checkIsUrl(shareData.description) ? shareData.description : "");

  let bookmark: Bookmark = {
    image: "/images/icons/icon-192x192.png",
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
    description: parsedUrl.searchParams.get("description"),
  };
};

const checkIsUrl = function(str: string) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  return urlRegex.test(str);
};
