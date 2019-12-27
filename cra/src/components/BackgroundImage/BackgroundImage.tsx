import React from "react";
import styled from "styled-components";
import Link from "navigation/Link";

const CLASS_NAME = "background-image";

export default function BackgroundImage({
  children = null,
  src,
  to = "",
  className = "",
  ...additionalProps
}) {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  let imageStyles = { backgroundImage: `url('${src}')` };

  return (
    <StyledImageContainer {...additionalProps} className={cssClass}>
      <Link to={to} className={className}>
        <div className="img" style={imageStyles}>
          {children}
        </div>
      </Link>
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
