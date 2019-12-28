import React from "react";
import ScreenLayout, { StyledPage } from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import { IonTitle, IonContent, IonCard } from "@ionic/react";
import Link from "navigation/Link";
import BookmarksList from "Bookmarks/BookmarksList";
import styled from "styled-components";
import NewCollectionFab from "Collections/NewCollectionFab";

function HomeScreen({ ...rest }) {
  return (
    <StyledPage>
      {/* <IonHeader>
        <IonTo
      </IonHeader> */}
      <IonContent>
        <StyledSplash>
          <div className="logo centered">
            <img src="/images/icons/icon-512x512.png" />
          </div>
          <div className="greeting">Welcome to</div>
          <h1 className="app-title">Bookmarker</h1>
        </StyledSplash>
        {/* <CollectionsList /> */}
        <StyledGridContainer>
          <CollectionsList />
        </StyledGridContainer>
        <NewCollectionFab />
      </IonContent>
    </StyledPage>
    // <ScreenLayout title="Bookmarker" showBack={false}>
    //   {/* <CollectionsList /> */}
    //   {/* <StyledSectionTitle>Recent Bookmarks</StyledSectionTitle>
    //   <BookmarksList /> */}
    // </ScreenLayout>
  );
}

export default React.memo(HomeScreen);

const StyledGridContainer = styled(IonCard)`
  background: var(--white);
  /* margin: 16px; */
  /* padding: 10px 0 10px; */
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
    font-size: 55px;
    font-family: "Slabo 27px";
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
const StyledSectionTitle = styled(IonTitle)`
  font-size: 22px;
  /* text-align: center; */
  color: var(--primary-700);
  margin: 30px 0 5px 0;
`;
