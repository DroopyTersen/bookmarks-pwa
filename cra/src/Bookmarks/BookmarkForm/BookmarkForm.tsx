import React, { useEffect } from "react";
import styled from "styled-components";
import useBookmarkForm, { BookmarkStatus } from "./useBookmarkForm";
import { Bookmark } from "Bookmarks/BookmarksApi";
import useLocation from "hooks/useLocation";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonFooter,
  IonCard,
} from "@ionic/react";
import useCollections from "Collections/useCollections";
import CollectionPicker from "Collections/CollectionPicker";
import useNavigation from "navigation/useNavigation";
import { useFooterCommands } from "app/Footer";
import { FormStatus } from "Collections/useCollectionForm";

let fallBackImage = "/images/fallback.png";
export default function BookmarkForm({ bookmark: initialBookmark }: BookmarkFormProps) {
  let { bookmark, status, update, save } = useBookmarkForm(initialBookmark);
  let { navigate } = useNavigation();
  let footerControls = useFooterCommands();
  let handleSave = async function() {
    console.log("Saving");
    await save();
    navigate("/collections");
  };

  useEffect(() => {
    let command = {
      text: "Save",
      onClick: handleSave,
      disabled: status !== BookmarkStatus.Valid,
    };
    footerControls.set([command]);
  });

  return (
    <StyledContainer>
      <StyledForm>
        <StyledFormControl>
          <IonLabel color="light" position="stacked">
            Url
          </IonLabel>
          <StyledTextArea
            className="monospace"
            placeholder="Bookmark url..."
            rows={4}
            name="url"
            value={bookmark.url}
            onIonBlur={(event: any) => update("url", event.target.value)}
          ></StyledTextArea>
        </StyledFormControl>

        <StyledFormControl>
          <IonLabel position="fixed">Collection</IonLabel>
          <CollectionPicker
            value={bookmark.collectionKey}
            onChange={(val) => update("collectionKey", val)}
          />
        </StyledFormControl>
        {/* <StyledPicker>
          <CollectionPicker
            value={bookmark.collectionKey}
            onChange={(val) => update("collectionKey", val)}
          />
        </StyledPicker> */}

        <StyledFormControl>
          <IonLabel position="floating">Title</IonLabel>
          <StyledTextArea
            className="title"
            name="title"
            placeholder="Bookmark title..."
            required={true}
            value={bookmark.title}
            onIonChange={(event: any) => update("title", event.target.value)}
          ></StyledTextArea>
        </StyledFormControl>

        <StyledFormControl>
          <IonLabel position="floating">Description</IonLabel>
          <StyledTextArea
            name="description"
            placeholder="Bookmark description..."
            required={true}
            rows={6}
            value={bookmark.description}
            clearInput={true}
            onIonChange={(event: any) => update("description", event.target.value)}
          ></StyledTextArea>
        </StyledFormControl>

        <StyledImageContainer className="centered">
          <img src={bookmark.image || fallBackImage} />
        </StyledImageContainer>
        <StyledFormControl>
          <IonLabel position="floating">Image</IonLabel>
          <StyledTextArea
            className="monospace"
            placeholder="Image url..."
            rows={4}
            name="image"
            value={bookmark.image}
            clearInput={true}
            onIonChange={(event: any) => update("image", event.target.value)}
          ></StyledTextArea>
        </StyledFormControl>

        {/* <StyledFormControl> */}
        <StyledSaveButton
          size="large"
          expand="block"
          color="light"
          fill="outline"
          disabled={status !== BookmarkStatus.Valid}
          onClick={handleSave}
        >
          Save
        </StyledSaveButton>
        {/* </StyledFormControl> */}
      </StyledForm>
    </StyledContainer>
  );
}

export interface BookmarkFormProps {
  bookmark?: Bookmark;
}

const StyledFormControl = styled(IonItem)`
  /* padding: 10px;
  border-bottom: none;
  border-bottom-color; */
  --ion-border-color: transparent;
  padding: 3px 0 16px 0px;
`;

// const StyledForm = styled(IonCard)`
const StyledTextArea = styled(IonTextarea)`
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  /* border: 1px solid rgba(0, 0, 0, 0.11); */
  .item-has-focus & {
    /* background: rgba(0, 0, 0, 0.07); */
    /* border: 1px solid var(--accent-500); */
  }
  &.title {
    font-size: 20px;
  }
`;

const StyledForm = styled.div`
  --ion-color-primary: var(--white);
`;

const StyledSaveButton = styled(IonButton)`
  margin: 0 16px;
`;
const StyledContainer = styled.div`
  padding-bottom: 80px;

  .monospace {
    font-family: var(--monospace);
    word-wrap: break-word;
  }
`;

const StyledImageContainer = styled.div`
  margin: 16px 16px 0 16px;
  img {
    max-width: 100%;
  }
`;
