import React from "react";
import styled from "styled-components";
import PageHeader, { PageHeaderProps } from "./PageHeader";

const CLASS_NAME = "screen";

export interface ScreenLayoutProps extends PageHeaderProps {
  // props
  className?: string;
  [key: string]: any;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  className = "",
  title = "title",
  back,
  ...rest
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledScreenLayout {...rest} className={cssClass}>
      <PageHeader title={title} back={back} />
      <div className="content">{children}</div>
    </StyledScreenLayout>
  );
};

export default ScreenLayout;

const StyledScreenLayout = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  .content {
    margin-top: 70px;
  }
`;
