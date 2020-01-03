import React, { useEffect } from "react";
import { Bookmark } from "Bookmarks/BookmarksApi";
import useTags from "./useTags";
import kebabCase from "lodash/kebabCase";
import uniq from "lodash/uniq";

export default function useTagGuesser(bookmark: Bookmark, updateTags: (tags: string[]) => void) {
  let { tags } = useTags();

  useEffect(() => {
    if (bookmark && bookmark.title && (!bookmark.tags || !bookmark.tags.length)) {
      let tagMatches = findTagMatches(bookmark.title + bookmark.description, tags);
      if (tagMatches.length) {
        updateTags(tagMatches);
      }
    }
  }, [bookmark, tags]);
}

const findTagMatches = function(text: string, tags = []) {
  let regexStr = tags.map((tag) => `(${tag})`).join("|");
  let regex = new RegExp(regexStr, "gi");
  //   console.log(regexStr, kebabCase(text));
  let matches = (kebabCase(text.toLowerCase()) + "").match(regex);
  console.log("TAG MATCHES", matches);
  return uniq((matches || []).filter(Boolean));
};
