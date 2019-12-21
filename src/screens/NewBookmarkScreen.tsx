import React from "react";
import Layout, { BaseScreenProps } from "../components/appShell/Layout";
import styled from "styled-components";
import SaveBookmarkForm from "../components/BookmarkForm/SaveBookmark";
import useLocation from "../hooks/useLocation";
import { Bookmark } from "../data/interfaces";

export default function ShareTargetScreen({}: NewBookmarkScreenProps) {
  let location = useLocation();
  let bookmark = getBookmarkFromQueryString(location.href);

  return (
    <StyledContainer>
      <>
        <SaveBookmarkForm bookmark={bookmark} />
      </>
    </StyledContainer>
  );
}

const StyledContainer = styled(Layout)`
  .url {
    font-family: var(--monospace);
    word-wrap: break-word;
  }
`;
export interface NewBookmarkScreenProps extends BaseScreenProps {
  id?: string;
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
