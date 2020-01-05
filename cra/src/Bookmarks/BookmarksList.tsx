import React, { useState } from "react";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";
import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";
import useBookmarks from "./useBookmarks";
import {
  IonActionSheet,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonChip,
  IonLabel,
} from "@ionic/react";
import useNavigation from "navigation/useNavigation";
import Icon from "components/primitives/Icon";
import format from "date-fns/format";
import { SearchBox, Input, FormControl } from "components/primitives/Forms";
import ReactDOM from "react-dom";
import BookmarkCard from "./BookmarkCard";

function BookmarksList({ collectionKey, tag }: CollectionsListProps) {
  let [filterText, setFilterText] = useState("");
  let { bookmarks, remove } = useBookmarks({ collection: collectionKey, tag, text: filterText });
  let [actionSheetKey, setActionSheetKey] = useState("");
  let { navigate } = useNavigation();

  // console.log("TCL: BookmarksList -> bookmarks", bookmarks, collectionKey);
  let width = "300px";

  return (
    <>
      <StyledGridContainer>
        {/* <SearchBox value="" debounce={200} showCancelButton={true} placeholder="Search..." /> */}
        <BookmarkSearchBar value={filterText} onChange={setFilterText} />
        {bookmarks && bookmarks.length === 0 ? (
          <StyledMessage>Nothing to see here...</StyledMessage>
        ) : (
          <Grid className="bookmarks-list" gap={1} size={width}>
            {bookmarks.map((item) => (
              <BookmarkCard item={item} setActionSheetKey={setActionSheetKey} />
            ))}
          </Grid>
        )}
      </StyledGridContainer>
      <IonActionSheet
        header={bookmarks.find((b) => b.key === actionSheetKey)?.title}
        isOpen={!!actionSheetKey}
        onDidDismiss={() => setActionSheetKey("")}
        buttons={[
          {
            text: "Edit Bookmark",
            // icon: "edit",
            handler: () => {
              navigate("/bookmarks/edit/" + actionSheetKey);
            },
          },
          {
            text: "Delete Bookmark",
            // icon: "trash",
            role: "destructive",
            handler: () => {
              remove(actionSheetKey);
            },
          },
        ]}
      />
    </>
  );
}

function BookmarkSearchBar({ value = "", onChange }) {
  console.log("TCL: BookmarkSearchBar -> value", value);

  return ReactDOM.createPortal(
    <SearchBox value={value} color="light" onIonChange={(e) => onChange(e.target.value)} />,
    document.getElementById("app-header-placeholder")
  );
}

const StyledGridContainer = styled.div``;

export default React.memo(BookmarksList);
const StyledMessage = styled.p`
  /* color: var(--white); */
  font-style: italic;
  padding: 0 16px;
`;
export interface CollectionsListProps {
  //props
  collectionKey?: string;
  tag?: string;
}
