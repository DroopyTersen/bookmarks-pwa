import React from "react";
import styled from "styled-components";

const CLASS_NAME = "app-header";

export interface AppHeaderProps {
  // props
  className?: string;
  [key: string]: any;
}

const AppHeader: React.FC<AppHeaderProps> = ({ children, className = "", ...additionalProps }) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledAppHeader {...additionalProps} className={cssClass}>
      {children}
    </StyledAppHeader>
  );
};

export default AppHeader;

const StyledAppHeader = styled.div`
  position: relative;
  display: inline-block;
`;
