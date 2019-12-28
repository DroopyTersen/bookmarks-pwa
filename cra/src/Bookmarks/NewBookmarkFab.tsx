import React from "react";
import useNavigation from "navigation/useNavigation";
import { IonFab, IonFabButton } from "@ionic/react";
import Icon from "components/primitives/Icon";

function NewBookmarkFab({ collection = "" }: NewBookmarkFabProps) {
  let { navigate } = useNavigation();
  let url = "/bookmarks/new" + (collection ? `?collection=${collection}` : "");
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={() => navigate(url)} color={"primary"}>
        <Icon name="add" />
      </IonFabButton>
    </IonFab>
  );
}

export default React.memo(NewBookmarkFab);

export interface NewBookmarkFabProps {
  collection?: string;
}
