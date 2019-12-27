import React from "react";
import useCollections from "./useCollections";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";

import BackgroundImage from "components/BackgroundImage/BackgroundImage";

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

const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
  /* background: var(--secondary-600); */
  color: var(--white);
  text-shadow: 1px 1px 3px #000;
  font-size: 24px;
  padding: 2px 5px;
  text-align: center;
  a,
  a:hover,
  a:active,
  a:visited {
    text-decoration: none;
  }
`;
