import React from "react";
import styled from "styled-components";
import Link from "navigation/Link";

const CLASS_NAME = "background-image";

export default function BackgroundImage({
  children = null,
  src,
  to = "",
  href = "",
  className = "",
  ...additionalProps
}) {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  let imageStyles = { backgroundImage: `url('${src}')` };
  let LinkElem = to || href ? Link : React.Fragment;
  return (
    <StyledImageContainer {...additionalProps} className={cssClass}>
      <LinkElem to={to} className={className} href={href}>
        <div className="img" style={imageStyles}>
          {children}
        </div>
      </LinkElem>
    </StyledImageContainer>
  );
}

const StyledImageContainer = styled.div`
  /* font-weight: 200; */
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
  opacity: 1;
  /* margin: 0 0 10px 0 !important; */
  a .img:hover {
    opacity: 0.85;
  }
  div.img {
    background-size: cover;
    height: 100%;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.35);
  /* background: var(--secondary-600); */
  color: var(--white);
  text-shadow: 1px 1px 3px #000;
  font-size: 24px;
  padding: 2px 5px;
  text-align: center;
  a,
  a:hover,
  a:active,
  a:visited {
    text-decoration: none;
  }
`;
