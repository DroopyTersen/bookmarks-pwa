import React from "react";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";

import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";
import useBookmarks from "./useBookmarks";

function BookmarksList({ collectionKey }: CollectionsListProps) {
  let { bookmarks } = useBookmarks({ collection: collectionKey });
  console.log("TCL: BookmarksList -> bookmarks", bookmarks, collectionKey);
  let width = "300px";
  let height = "175px";
  return (
    <Grid className="bookmarks-list" gap={1} size={width}>
      {bookmarks.map((item) => (
        <BackgroundImage style={{ height }} src={item.image} key={item.key} href={item.url}>
          <StyledOverlay className="centered">{item.title}</StyledOverlay>
        </BackgroundImage>
      ))}
    </Grid>
  );
}

export default React.memo(BookmarksList);

export interface CollectionsListProps {
  //props
  collectionKey?: string;
}
