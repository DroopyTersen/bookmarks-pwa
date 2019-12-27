import React from "react";
import styled from "styled-components";

const CLASS_NAME = "screen";

export interface ScreenLayoutProps {
  // props
  className?: string;
  [key: string]: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  className = "",
  ...additionalProps
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledScreenLayout {...additionalProps} className={cssClass}>
      {children}
    </StyledScreenLayout>
  );
};

export default ScreenLayout;

const StyledScreenLayout = styled.div`
  position: relative;
  display: inline-block;
`;
