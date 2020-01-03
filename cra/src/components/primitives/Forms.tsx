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
  IonSearchbar,
} from "@ionic/react";

export const Form = styled.form`
  --ion-color-primary: var(--white);
  max-width: 600px;
`;

export const FormControl = styled.div`
  /* padding: 10px;
  border-bottom: none;
  border-bottom-color; */
  --ion-border-color: transparent;
  padding: 3px 12px 16px 12px;
  display: flex;
  flex-direction: column;
  &.horizontal {
    flex-direction: row;
    align-items: center;
    > *:first-child {
      margin-right: 10px;
      margin-bottom: 0px;
    }
  }
  > *:first-child {
    margin-bottom: 5px;
  }
`;

export const SearchBox = styled(IonSearchbar)`
  --ion-background-color: var(--white);
  padding-top: 0;
  input {
    font-size: 14px;
    box-sizing: border-box;

    /* padding: 0 10px !important; */
    /* background: rgba(0, 0, 0, 0.1) !important;
    color: var(--white) !important; */
    border-radius: 4px;
    /* margin-top: 8px; */
    /* width: 100%; */
  }
`;
export const Input = styled(IonInput)`
  /* --padding-start: 10px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  --padding-end: 8px; */
  font-size: 14px;
  box-sizing: border-box;
  /* padding: 0 10px !important; */
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: 8px;
  width: 100%;
`;
export const TextArea = styled(IonTextarea)`
  font-size: 14px;
  box-sizing: border-box;
  /* padding: 10px; */
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-top: 0px;
  /* border: 1px solid rgba(0, 0, 0, 0.11); */
  .item-has-focus & {
    /* background: rgba(0, 0, 0, 0.07); */
    /* border: 1px solid var(--accent-500); */
  }
  &.title {
    font-size: 16px;
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
