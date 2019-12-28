import React from "react";
import ScreenLayout, { StyledPage, StyledContent } from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import {
  IonTitle,
  IonContent,
  IonCard,
  IonButton,
  IonFooter,
  IonToolbar,
  IonMenuButton,
  IonButtons,
  IonMenuToggle,
} from "@ionic/react";
import Link from "navigation/Link";
import BookmarksList from "Bookmarks/BookmarksList";
import styled from "styled-components";
import NewCollectionFab from "Collections/NewCollectionFab";
import Icon from "components/primitives/Icon";
import useNavigation from "navigation/useNavigation";
import Menu from "navigation/Menu";
import NewBookmarkFab from "Bookmarks/NewBookmarkFab";

function HomeScreen({ ...rest }) {
  let { navigate } = useNavigation();
  return (
    <StyledPage>
      <StyledContent>
        <StyledSplash>
          <div className="logo centered">
            <img src="/images/icons/icon-512x512.png" />
          </div>
          <div className="greeting">Welcome to</div>
          <h1 className="app-title">Bookmarker</h1>
        </StyledSplash>
        <CollectionsList />
      </StyledContent>
      {/* <Menu isOpen={true} /> */}
      {/* <IonFooter>
        <IonToolbar>
          <IonButtons>
            <IonMenuButton slot="start"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter> */}
      <NewBookmarkFab />
    </StyledPage>
  );
}

export default React.memo(HomeScreen);

const StyledGridContainer = styled(IonCard)`
  background: var(--white);
`;

const StyledSplash = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 0 50px;
  .greeting {
    opacity: 0.75;
  }
  .app-title {
    margin: 0;
    font-size: 58px;
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
    img {
      width: 100px;
      height: 100px;
    }
  }
`;
