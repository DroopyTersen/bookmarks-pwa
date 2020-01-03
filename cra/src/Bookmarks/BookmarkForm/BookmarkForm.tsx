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
import { BigButton, FormControl, TextArea, Form, ImagePreview } from "components/primitives/Forms";
import TagPicker from "Bookmarks/TagPicker";

let fallBackImage = "/images/bookmark.png";
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
    <Form>
      <FormControl>
        <IonLabel color="light" position="stacked">
          Url
        </IonLabel>
        <TextArea
          className="monospace"
          placeholder="Bookmark url..."
          rows={4}
          name="url"
          value={bookmark.url}
          onIonBlur={(event: any) => update("url", event.target.value)}
        ></TextArea>
      </FormControl>

      <FormControl>
        <IonLabel position="fixed">Collection</IonLabel>
        <CollectionPicker
          value={bookmark.collectionKey}
          onChange={(val) => update("collectionKey", val)}
        />
      </FormControl>

      <FormControl>
        <IonLabel position="fixed">Tags</IonLabel>
        <TagPicker value={bookmark.tags} onChange={(val) => update("tags", val)} />
      </FormControl>

      <FormControl>
        <IonLabel position="floating">Title</IonLabel>
        <TextArea
          className="title"
          name="title"
          placeholder="Bookmark title..."
          required={true}
          value={bookmark.title}
          onIonChange={(event: any) => update("title", event.target.value)}
        ></TextArea>
      </FormControl>

      <FormControl>
        <IonLabel position="floating">Description</IonLabel>
        <TextArea
          name="description"
          placeholder="Bookmark description..."
          required={true}
          rows={6}
          value={bookmark.description}
          clearInput={true}
          onIonChange={(event: any) => update("description", event.target.value)}
        ></TextArea>
      </FormControl>
      <ImagePreview src={bookmark.image} />
      <FormControl>
        <IonLabel position="floating">Image</IonLabel>
        <TextArea
          className="monospace"
          placeholder="Image url..."
          rows={4}
          name="image"
          value={bookmark.image}
          clearInput={true}
          onIonChange={(event: any) => update("image", event.target.value)}
        ></TextArea>
      </FormControl>

      {/* <StyledFormControl> */}
      {/* <BigButton disabled={status !== BookmarkStatus.Valid} onClick={handleSave}>
        Save
      </BigButton> */}
      {/* </StyledFormControl> */}
    </Form>
  );
}

export interface BookmarkFormProps {
  bookmark?: Bookmark;
}

const StyledImageContainer = styled.div`
  margin: 16px 16px 0 16px;
  img {
    max-width: 100%;
  }
`;
