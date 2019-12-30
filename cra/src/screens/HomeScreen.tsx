import React from "react";
import ScreenLayout, { StyledPage, StyledContent } from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import { IonCard, IonFooter, IonToolbar, IonButtons, IonButton } from "@ionic/react";

import styled from "styled-components";

import useNavigation from "navigation/useNavigation";
import NewBookmarkFab from "Bookmarks/NewBookmarkFab";
import Splash from "components/Splash/Splash";
import Icon from "components/primitives/Icon";

function HomeScreen({ ...rest }) {
  let { navigate } = useNavigation();
  return (
    <ScreenLayout hideHeader={true}>
      <Splash title="Bookmarker" subtitle="Welcome to" />
      <CollectionsList />
    </ScreenLayout>
  );
}

export default React.memo(HomeScreen);
