import React, { useState, useEffect, useReducer, useRef } from "react";
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
import useSize, { Size } from "hooks/useSize";

function BookmarksList({ collectionKey, tag }: CollectionsListProps) {
  let [filterText, setFilterText] = useState("");
  let { bookmarks, remove } = useBookmarks({ collection: collectionKey, tag, text: filterText });
  let [actionSheetKey, setActionSheetKey] = useState("");
  let { navigate } = useNavigation();
  let size = useSize();
  // console.log("TCL: BookmarksList -> bookmarks", bookmarks, collectionKey);
  let width = size === Size.large ? "420px" : "300px";

  return (
    <>
      <StyledGridContainer>
        {/* <SearchBox value="" debounce={200} showCancelButton={true} placeholder="Search..." /> */}
        <BookmarkSearchBar value={filterText} onChange={setFilterText} />
        {bookmarks && bookmarks.length === 0 ? (
          <StyledMessage>Nothing to see here...</StyledMessage>
        ) : (
          <Grid className="bookmarks-list" gap={20} size={width}>
            {bookmarks.map((item) => (
              <BookmarkCard key={item.key} item={item} setActionSheetKey={setActionSheetKey} />
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
  let elem = document.getElementById("app-header-placeholder");
  console.log("SSearchBar", elem);
  let ref = useRef(null);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    if (!ref.current) {
      let elem = document.getElementById("app-header-placeholder");
      console.log("FORECE UPDATE", elem);
      forceUpdate();
    }
  });

  if (!elem) return null;
  return ReactDOM.createPortal(
    <SearchBox
      ref={ref}
      value={value}
      color="light"
      onIonChange={(e) => onChange(e.target.value)}
    />,
    elem
  );
}

const StyledGridContainer = styled.div`
  padding: 10px 10px;
`;

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
