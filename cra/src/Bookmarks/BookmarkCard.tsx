import React, { useState } from "react";
import { Bookmark } from "./BookmarksApi";
import BackgroundImage, { StyledOverlay } from "components/BackgroundImage/BackgroundImage";
import {
  IonCardContent,
  IonCardSubtitle,
  IonChip,
  IonLabel,
  IonCard,
  IonButton,
} from "@ionic/react";
import { format } from "date-fns";
import { navigate } from "ionicons/icons";
import Icon from "components/primitives/Icon";
import styled from "styled-components";
import { parse as parseUrl } from "url";
import useNavigation from "navigation/useNavigation";
import Shave from "components/Shave/Shave";

function BookmarkCard({ item, setActionSheetKey }: BookmarkCardProps) {
  let height = "325px";
  let { navigate } = useNavigation();
  let [expanded, setExpanded] = useState(false);

  return (
    <StyledCard key={item.key}>
      <BackgroundImage style={{ height }} src={item.image} key={item.key} href={item.url}>
        <TopCaption className="slabo">{item.title}</TopCaption>

        <BottomCaption>
          <StyledTags className="tags">
            {item.tags.map((tag) => (
              <IonChip
                key={tag}
                color="light"
                outline
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  navigate("/tags/" + tag);
                }}
              >
                <IonLabel>{tag}</IonLabel>
              </IonChip>
            ))}
          </StyledTags>
          <Shave maxHeight={90}>{item.description}</Shave>
          <div className="info">
            <div>
              <a href={item.url} className="url monospace">
                {parseUrl(item.url).hostname}
              </a>
            </div>
            <div className="date">{format(new Date(item.created), "MM/dd/yyyy")}</div>
          </div>
        </BottomCaption>
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
    </StyledCard>
  );
}

export default React.memo(BookmarkCard);

export interface BookmarkCardProps {
  item: Bookmark;
  setActionSheetKey: (key: string) => void;
}

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  > * {
    margin-right: 5px;
    margin-top: 5px;
  }
  ion-chip {
    font-size: 13px;
    padding: 0 10px;
    margin-left: 0;
  }
`;
const TopCaption = styled(StyledOverlay)`
  display: flex;
  align-items: flex-start;
  text-align: left;
  justify-content: flex-start;
  background: radial-gradient(#0000004f, #00000099 49%, #000000d9 95%);
  /* background: linear-gradient(#000000a1, #00000022); */
  padding: 10px;
  padding-top: 40px;
`;

const BottomCaption = styled(TopCaption)`
  /* background: linear-gradient(#00000022 35%, #000000a1); */
  background: transparent;
  justify-content: flex-end;
  flex-direction: column;
  padding: 10px;
  font-size: 14px;
  > * {
    width: 100%;
  }
`;

const StyledCard = styled(IonCard)`
  background: var(--white);
  margin: 0;
  /* color: var(--white); */
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    margin-top: 10px;
    width: 100%;
    .url {
      color: var(--accent-300);
    }
    .date {
      color: var(--grey-300);
    }
  }
  .tags {
    margin-bottom: 5px;
  }
  .slabo {
    --ion-font-family: "Slabo 27px";
    font-family: "Slabo 27px";
  }
`;

const StyledActionButton = styled(IonButton)`
  position: absolute;
  top: 0px;
  right: 0px;
  color: var(--white);
`;
