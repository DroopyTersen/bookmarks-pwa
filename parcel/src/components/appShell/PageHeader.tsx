import React from "react";
import styled from "styled-components";
import { Toolbar, BackButton } from "react-onsenui";
import { useNavigator } from "../navigator/Navigator";

const CLASS_NAME = "page-header";

export interface PageHeaderProps {
  // props
  className?: string;
  [key: string]: any;
  back?: () => void | null;
  title?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children,
  className = "",
  title,
  back,
  ...additionalProps
}) => {
  let navigator = useNavigator();
  console.log(navigator);
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  let showBack = back !== null;

  return (
    <StyledPageHeader {...additionalProps} className={cssClass}>
      {showBack && <BackButton onClick={() => navigator.popPage()}>Back</BackButton>}
      {title && <div className="center">{title}</div>}
      {children}
    </StyledPageHeader>
  );
};

export default PageHeader;

const StyledPageHeader = styled(Toolbar)`
  position: relative;
  display: inline-block;
`;
