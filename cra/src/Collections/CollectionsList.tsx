import React from "react";
import useCollections from "./useCollections";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";

import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";

function CollectionsList({}: CollectionsListProps) {
  let { items } = useCollections();
  let width = "150px";
  let height = width;
  return (
    <Grid className="collections-list" gap={1} size="150px">
      {items.map((item) => (
        <BackgroundImage
          style={{ height }}
          src={item.image}
          key={item.key}
          to={"/collections/" + item.slug}
        >
          <StyledOverlay className="centered">{item.title}</StyledOverlay>
        </BackgroundImage>
      ))}
    </Grid>
  );
}

export default React.memo(CollectionsList);

export interface CollectionsListProps {
  //props
}
