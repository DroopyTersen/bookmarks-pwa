import React from "react";
import styled from "styled-components";

export default function Splash({
  title = "Bookmarker",
  subtitle = "Welcome to",
  image = "/images/icons/icon-512x512.png",
  imageSize = "100px",
  fontSize = "58px",
  ...rest
}) {
  return (
    <StyledSplash {...rest} fontSize={fontSize}>
      <div className="logo centered">
        <LogoImage size={imageSize} src={image} />
      </div>
      <div className="subtitle">{subtitle}</div>
      <h1 className="splash-title">{title}</h1>
    </StyledSplash>
  );
}

const StyledSplash = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0 50px;
  text-align: center;
  padding: 0 10px;
  .subtitle {
    opacity: 0.75;
  }
  .splash-title {
    margin: 0;
    font-size: ${(props) => props.fontSize};
    font-family: "Slabo 27px";
    text-shadow: 1px 1px 4px #0003;
  }
  .logo {
    box-shadow: var(--box-shadow);
    background: rgba(252, 253, 255, 0.9);
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 20px;
    overflow: hidden;
    border: 2px solid var(--white);
  }
`;

const LogoImage = styled.img`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;
