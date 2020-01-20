import React from "react";
import styled from "styled-components";
import { IonCard } from "@ionic/react";

const CLASS_NAME = "bookmarker-card";

export interface CardProps {
  // props
  className?: string;
  [key: string]: any;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...additionalProps }) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledCard {...additionalProps} className={cssClass}>
      {children}
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled(IonCard)`
  position: relative;
  background: var(--white);
`;
