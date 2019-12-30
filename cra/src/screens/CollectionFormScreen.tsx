import React from "react";
import ScreenLayout from "./ScreenLayout";
import useLocation from "hooks/useLocation";
import BookmarkForm from "Bookmarks/BookmarkForm/BookmarkForm";
import { Bookmark } from "Bookmarks/BookmarksApi";
import CollectionForm from "Collections/CollectionForm";
import { IonCard } from "@ionic/react";
import styled from "styled-components";

export default function CollectionFormScreen({ title = "New Collection", id = "", ...rest }) {
  return (
    <ScreenLayout title={title} backUrl="back">
      <CollectionForm id={id} />
    </ScreenLayout>
  );
}

const StyledForm = styled(IonCard)`
  --ion-background-color: var(--white);
  --ion-text-color: var(--black);
  background: var(--white);
`;
