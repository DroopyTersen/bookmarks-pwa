import React, { useState } from "react";
import kebabCase from "lodash/kebabCase";
import {
  IonChip,
  IonLabel,
  IonIcon,
  IonModal,
  IonContent,
  IonInput,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
} from "@ionic/react";
import { Input, FormControl } from "components/primitives/Forms";
import styled from "styled-components";
import useTags from "./useTags";

function TagPicker({ value: tags = [], onChange }: TagPickerProps) {
  let [isModalOpen, setIsModalOpen] = useState(false);
  const handleInputChange = (e) => {
    let val = e.target.value || "";
    onChange(
      val
        .split(" ")
        .filter(Boolean)
        .map((val) => kebabCase(val))
    );
  };
  const handleRemove = function(tag: string) {
    onChange(tags.filter((t) => t !== tag).filter(Boolean));
  };
  return (
    <StyledContainer>
      <StyledTags>
        {tags.filter(Boolean).map((tag) => (
          <IonChip key={tag} color="light" onClick={() => handleRemove(tag)}>
            <IonLabel>{tag}</IonLabel>
            <IonIcon name="close-circle" />
          </IonChip>
        ))}
        <IonChip color="light" outline onClick={() => setIsModalOpen(true)}>
          <IonLabel>Add</IonLabel>
          <IonIcon name="add" />
        </IonChip>
      </StyledTags>
      <TagModal
        selected={tags}
        onChange={onChange}
        isOpen={isModalOpen}
        dismiss={() => setIsModalOpen(false)}
      />
      {/* <div style={{ width: "100%" }}>
        <Input value={tags.join(" ")} onInput={handleInputChange} />
      </div> */}
    </StyledContainer>
  );
}

export default React.memo(TagPicker);

const StyledContainer = styled.div`
  width: 100%;
`;
const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -10px;
  > * {
    margin-right: 10px;
    margin-bottom: 5px;
  }
`;
export interface TagPickerProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export interface TagModalProps {
  selected: string[];
  onChange: (tags: string[]) => void;
  dismiss: () => void;
  isOpen: boolean;
}

function TagModal({ selected = [], onChange, isOpen = false, dismiss }: TagModalProps) {
  let { tags } = useTags();
  let [input, setInput] = useState("");
  const toggleTag = function(tag: string) {
    let newTags = selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag];
    onChange(newTags);
  };
  let isValidTag = input && !tags.find((t) => t === input.toLowerCase());

  const submitTag = (e) => {
    e.preventDefault();
    if (isValidTag) {
      onChange([...selected, input]);
      setInput("");
    }
  };

  console.log(input);
  return (
    <StyledModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Update Tags</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={dismiss}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <StyledForm onSubmit={submitTag}>
          <div className="input">
            <Input value={input} onIonChange={(e) => setInput(e.target.value || "")} autofocus />
            <IonButton fill="outline" color="light" disabled={!isValidTag} type="submit">
              <IonLabel>Add</IonLabel>
              <IonIcon slot="end" name="add"></IonIcon>
            </IonButton>
          </div>
          <StyledTags>
            {selected.filter(Boolean).map((tag) => (
              <IonChip
                key={tag}
                color="light"
                onClick={() => onChange(selected.filter((t) => t !== tag))}
              >
                <IonLabel>{tag}</IonLabel>
                <IonIcon name="close-circle" />
              </IonChip>
            ))}
          </StyledTags>
        </StyledForm>
        <IonList>
          {tags
            .filter((t) => t.includes(input.toLowerCase()))
            .map((tag) => (
              <IonItem key={tag} detail={false} onClick={() => toggleTag(tag)}>
                <IonLabel>{tag}</IonLabel>
                <IonIcon
                  color="light"
                  slot="end"
                  name={selected.includes(tag) ? "checkbox" : "square-outline"}
                />
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </StyledModal>
  );
}

const StyledForm = styled.form`
  padding: 3px 12px 16px 12px;
  margin-bottom: 10px;
`;
const StyledModal = styled(IonModal)`
  background: linear-gradient(-77deg, var(--secondary-800), var(--secondary-600));
  background: linear-gradient(-13deg, #efc75e 10%, #e2574c 75%);
  --ion-background-color: var(--secondary-600);
  .input {
    display: flex;
    align-items: center;
    margin-top: 10px;
    > *:first-child {
      margin-right: 5px;
    }
    ion-input {
      margin-top: 0;
    }
  }
  ion-list {
    padding-top: 0;
  }
`;
