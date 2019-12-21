import React from "react";
import styled from "styled-components";
import useSaveBookmark, { BookmarkStatus } from "../../hooks/useSaveBookmark";
import { SaveButton } from "../primitives/Buttons";
import Editable from "../Editable/Editable";
import { Bookmark } from "../../data/interfaces";

let fallBackImage = require("../../images/icons/icon-192x192.png");
export default function SaveBookmarkForm({ bookmark: initialBookmark }: SaveBookmarkFormProps) {
  let { bookmark, status, update, save } = useSaveBookmark(initialBookmark);
  return (
    <StyledContainer>
      <>
        <Editable as="h2" onChange={(val) => update("title", val)}>
          {bookmark.title}
        </Editable>

        <StyledImageContainer className="centered">
          <img src={bookmark.image || fallBackImage} />
        </StyledImageContainer>

        <Editable as="p" className="url" onChange={(val) => update("url", val)}>
          {bookmark.url}
        </Editable>

        <Editable
          as={StyledDescription}
          className="description"
          onChange={(val) => update("description", val)}
        >
          {bookmark.description}
        </Editable>
        <StyledActions>
          <SaveButton disabled={status !== BookmarkStatus.Valid} type="button" onClick={save}>
            Save
          </SaveButton>
        </StyledActions>
      </>
    </StyledContainer>
  );
}

export interface SaveBookmarkFormProps {
  id?: string;
  bookmark?: Bookmark;
}

const StyledActions = styled.div`
  /* background: var(--secondary-300); */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--white);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
`;

const StyledDescription = styled.p`
  white-space: pre-wrap;
`;

const StyledContainer = styled.div`
  padding-bottom: 80px;
  .url {
    font-family: var(--monospace);
    word-wrap: break-word;
  }
`;

const StyledImageContainer = styled.div`
  width: 100%;
  img {
    max-width: 100%;
  }
`;
