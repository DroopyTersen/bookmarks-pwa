import { Bookmark } from "../data/interfaces";
import { useReducer, useEffect } from "react";
import { previewLink } from "../data/linkPreview";
import api from "../data/api";
import { Stats } from "fs";

let reducer = function(state: SaveBookmarkState, action: any): SaveBookmarkState {
  var bookmark: Bookmark = null;
  switch (action.type) {
    case "link-preview-start":
      return {
        ...state,
        status: BookmarkStatus.LoadingLinkPreview,
      };
    case "link-preview-result":
      bookmark = {
        ...state.bookmark,
        ...action.linkPreview,
      };
      return {
        ...state,
        bookmark,
        status: validateBookmark(bookmark) ? BookmarkStatus.Valid : BookmarkStatus.Incomplete,
      };
    case "update-bookmark":
      bookmark = {
        ...state.bookmark,
        [action.key]: action.value,
      };
      return {
        ...state,
        bookmark,
        status: validateBookmark(bookmark) ? BookmarkStatus.Valid : BookmarkStatus.Incomplete,
      };
    case "save-start":
      return {
        ...state,
        status: BookmarkStatus.SavingBookmark,
      };
    case "save-success":
      return {
        ...state,
        bookmark: {
          ...state.bookmark,
          ...action.bookmark,
        },
        status: BookmarkStatus.Valid,
      };
    case "save-error":
      return {
        ...state,
        status: BookmarkStatus.Error,
      };
  }

  return state;
};

export default function useSaveBookmark(initialBookmark?: Bookmark) {
  let [state, dispatch] = useReducer(reducer, getDefaultState(initialBookmark));

  useEffect(() => {
    let isMounted = true;
    let fetchPreview = async () => {
      dispatch({ type: "link-preview-start" });
      let linkPreview = await previewLink(state.bookmark.url);
      if (isMounted) {
        dispatch({ type: "link-preview-result", linkPreview });
      }
    };
    if (state.bookmark.url) {
      fetchPreview();
    }
    return () => (isMounted = false);
  }, [state.bookmark.url]);

  const save = async () => {
    console.log("Saving", state);
    if (state.status === BookmarkStatus.Valid) {
      dispatch({ type: "save-start" });
      let savedBookmark = await api.bookmarks.save(state.bookmark);
      console.log("Save Success", savedBookmark);
      dispatch({ type: "save-success", bookmark: savedBookmark });
    }
  };

  return {
    ...state,
    update: (key: string, value: any) => dispatch({ type: "update-bookmark", key, value }),
    save,
  };
}
export interface SaveBookmarkState {
  bookmark: Bookmark;
  status: BookmarkStatus;
}

export enum BookmarkStatus {
  LoadingLinkPreview = "loading-link-preview",
  Incomplete = "incomplete-bookmark",
  Valid = "valid-bookmark",
  SavingBookmark = "saving-bookmark",
  Error = "error",
}

const getDefaultState = (initialBookmark: Bookmark): SaveBookmarkState => {
  return {
    bookmark: initialBookmark,
    status: validateBookmark(initialBookmark) ? BookmarkStatus.Valid : BookmarkStatus.Incomplete,
  };
};

const validateBookmark = (bookmark: Bookmark) => {
  return bookmark.url && bookmark.title;
};
