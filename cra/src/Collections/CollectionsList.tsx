import React, { useState } from "react";
import useCollections from "./useCollections";
import Link from "navigation/Link";
import Grid from "components/Grid/Grid";
import styled from "styled-components";

import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";
import { IonButton, IonActionSheet } from "@ionic/react";
import Icon from "components/primitives/Icon";
import useNavigation from "navigation/useNavigation";

function CollectionsList({}: CollectionsListProps) {
  let { items } = useCollections();
  let width = "150px";
  let height = width;
  let { navigate } = useNavigation();
  let [actionSheetKey, setActionSheetKey] = useState("");

  return (
    <>
      <Grid className="collections-list" gap={1} size="150px">
        {items.map((item) => (
          <StyledImage
            style={{ height }}
            src={item.image}
            key={item.key}
            to={"/collections/" + item.slug}
          >
            <StyledOverlay className="centered">{item.title}</StyledOverlay>
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
          </StyledImage>
        ))}
      </Grid>
      <IonActionSheet
        header={items.find((c) => c.key === actionSheetKey)?.title}
        isOpen={!!actionSheetKey}
        onDidDismiss={() => setActionSheetKey("")}
        buttons={[
          {
            text: "Edit Collection",
            // icon: "edit",
            handler: () => {
              navigate("/collections/edit/" + actionSheetKey);
            },
          },
          {
            text: "Delete Collection",
            // icon: "trash",
            role: "destructive",
            handler: () => {
              alert("Delete Item!" + actionSheetKey);
            },
          },
        ]}
      />
    </>
  );
}

export default React.memo(CollectionsList);

let StyledImage = styled(BackgroundImage)`
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
`;
export interface CollectionsListProps {
  //props
}

const StyledActionButton = styled(IonButton)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: var(--white);
`;