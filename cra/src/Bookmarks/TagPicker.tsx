import React from "react";
import kebabCase from "lodash/kebabCase";
import { IonChip, IonLabel, IonIcon, IonAvatar, IonContent, IonInput } from "@ionic/react";
import { Input } from "components/primitives/Forms";
import styled from "styled-components";

function TagPicker({ value: tags = [], onChange }: TagPickerProps) {
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
          <IonChip color="light" onClick={() => handleRemove(tag)}>
            <IonLabel>{tag}</IonLabel>
            <IonIcon name="close-circle" />
          </IonChip>
        ))}
      </StyledTags>
      <div style={{ width: "100%" }}>
        <Input value={tags.join(" ")} onInput={handleInputChange} />
      </div>
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
