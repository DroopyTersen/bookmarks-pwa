import React from "react";
import useCollectionForm, { FormStatus } from "./useCollectionForm";
import useNavigation from "navigation/useNavigation";
import styled from "styled-components";
import { IonTextarea, IonItem, IonLabel, IonButton } from "@ionic/react";
import BackgroundImage from "components/BackgroundImage/BackgroundImage";

function CollectionForm({ id = "" }: CollectionFormProps) {
  let { item, save, update, status } = useCollectionForm(id);
  let { navigate } = useNavigation();

  if (status === FormStatus.Loading) {
    return <div>Loading...</div>;
  }
  if (status === FormStatus.Error) {
    return <h1>ERROR!</h1>;
  }
  let handleSave = async function() {
    let savedItem = await save();
    if (savedItem && savedItem.slug) {
      navigate("/collections");
    }
  };

  return (
    <StyledContainer>
      <IonItem>
        <IonLabel position="floating">Title</IonLabel>
        <StyledTextArea
          className="title"
          name="title"
          placeholder="Collection title..."
          required={true}
          value={item.title}
          onIonChange={(event: any) => update("title", event.target.value)}
        ></StyledTextArea>
      </IonItem>

      <IonItem>
        <IonLabel position="floating">Sort Order</IonLabel>
        <StyledTextArea
          className="sort-order"
          name="sortOrder"
          type="number"
          required={true}
          value={item.sortOrder ?? 99}
          onIonChange={(event: any) => update("sortOrder", event.target.value)}
        ></StyledTextArea>
      </IonItem>

      <BackgroundImage src={item.image} style={{ height: "300px" }} />
      <IonItem>
        <IonLabel position="floating">Image</IonLabel>
        <StyledTextArea
          className="monospace"
          placeholder="Image url..."
          rows={4}
          name="image"
          value={item.image}
          onIonChange={(event: any) => update("image", event.target.value)}
        ></StyledTextArea>
      </IonItem>

      <StyledActions>
        <IonButton
          expand="full"
          color="primary"
          disabled={status !== FormStatus.Valid}
          onClick={handleSave}
        >
          Save
        </IonButton>
      </StyledActions>
    </StyledContainer>
  );
}

export default React.memo(CollectionForm);

export interface CollectionFormProps {
  //props
  id?: string;
}

const StyledPicker = styled.div`
  position: relative;
  padding: 15px 16px 5px;
`;

const StyledTextArea = styled(IonTextarea)`
  font-size: 14px;
  &.title {
    font-size: 20px;
  }
`;

const StyledActions = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: var(--white);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  padding: 6px 12px;
  z-index: 3;
  ion-button {
    width: 100%;
  }
`;

const StyledContainer = styled.div`
  padding-bottom: 80px;

  .monospace {
    font-family: var(--monospace);
    word-wrap: break-word;
  }
`;

const StyledImageContainer = styled.div`
  width: 100%;
  img {
    max-width: 100%;
    max-height: 400px;
  }
`;
