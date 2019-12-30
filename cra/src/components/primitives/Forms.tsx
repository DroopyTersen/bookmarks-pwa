import React, { useEffect } from "react";
import styled from "styled-components";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonButton,
  IonFooter,
  IonCard,
} from "@ionic/react";

export const Form = styled.form`
  --ion-color-primary: var(--white);
`;

export const FormControl = styled(IonItem)`
  /* padding: 10px;
  border-bottom: none;
  border-bottom-color; */
  --ion-border-color: transparent;
  padding: 3px 0 16px 0px;
`;
export const Input = styled(IonInput)`
  font-size: 14px;
  box-sizing: border-box;
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;
export const TextArea = styled(IonTextarea)`
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
    font-size: 18px;
  }
`;

const StyledSaveButton = styled(IonButton)`
  margin: 0 16px;
`;

export const BigButton = ({ onClick, disabled = false, children }) => {
  return (
    <StyledSaveButton
      size="default"
      expand="block"
      color="light"
      fill="outline"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledSaveButton>
  );
};

export const ImagePreview = function({ src = "/images/bookmark.png" }) {
  return (
    <StyledImageContainer className="centered">
      <img src={src} />
    </StyledImageContainer>
  );
};
const StyledImageContainer = styled.div`
  margin: 16px 16px 0 16px;
  img {
    max-width: 100%;
  }
`;
