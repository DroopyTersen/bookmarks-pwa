import React, { useState } from "react";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";

import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";
import useBookmarks from "./useBookmarks";
import { IonActionSheet, IonButton, IonCard } from "@ionic/react";
import useNavigation from "navigation/useNavigation";
import Icon from "components/primitives/Icon";

function BookmarksList({ collectionKey }: CollectionsListProps) {
  let { bookmarks, remove } = useBookmarks({ collection: collectionKey });
  let [actionSheetKey, setActionSheetKey] = useState("");
  let { navigate } = useNavigation();

  console.log("TCL: BookmarksList -> bookmarks", bookmarks, collectionKey);
  let width = "300px";
  let height = "175px";

  if (bookmarks && bookmarks.length === 0) {
    return <StyledMessage>You haven't added any bookmarks to this collection yet.</StyledMessage>;
  }
  return (
    <>
      <StyledGridContainer>
        <Grid className="bookmarks-list" gap={1} size={width}>
          {bookmarks.map((item) => (
            <BackgroundImage
              className="box-shadow"
              style={{ height }}
              src={item.image}
              key={item.key}
              href={item.url}
            >
              <Caption>{item.title}</Caption>
              <StyledActionButton
                fill="clear"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setActionSheetKey(item.key);
                  return false;
                }}
              >
                <Icon name="more" />
              </StyledActionButton>
            </BackgroundImage>
          ))}
        </Grid>
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

const Caption = styled(StyledOverlay)`
  display: flex;
  align-items: flex-end;
  text-align: left;
  justify-content: flex-start;
  background: linear-gradient(#00000012, #000000a1);
  padding: 5px 10px;
`;
const StyledGridContainer = styled(IonCard)`
  background: var(--white);
  --ion-font-family: "Slabo 27px";
  font-family: "Slabo 27px";
`;

const StyledActionButton = styled(IonButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--white);
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
}
