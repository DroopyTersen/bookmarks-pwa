import React from "react";
import Layout, { BaseScreenProps } from "../components/appShell/Layout";
import useLocation from "../hooks/useLocation";
import useAsyncData from "../hooks/useAsyncData";
import useShareTarget from "../hooks/useShareTarget";
import styled from "styled-components";

let fallBackImage = require("../images/icons/icon-192x192.png");
export default function ShareTargetScreen({}: ShareTargetScreenProps) {
  let { raw, url, title, image, description } = useShareTarget();
  return (
    <StyledContainer>
      <>
        <h1>New Bookmark</h1>

        <StyledImageContainer className="centered">
          <img src={image || fallBackImage} />
        </StyledImageContainer>
        <h2>{title}</h2>
        <p className="url">{url}</p>
        <p>{description}</p>
        <div>description = {description}</div>
      </>
    </StyledContainer>
  );
}

const StyledContainer = styled(Layout)`
  .url {
    font-family: var(--monospace);
  }
  textarea {
    width: 100%;
    max-width: 800px;
  }
`;
const StyledImageContainer = styled.div`
  width: 100%;
  img {
    max-width: 100%;
  }
`;
export interface ShareTargetScreenProps extends BaseScreenProps {
  id?: string;
}
