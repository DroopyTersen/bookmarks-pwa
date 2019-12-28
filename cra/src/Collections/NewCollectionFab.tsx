import React from "react";
import { IonFab, IonFabButton, IonIcon } from "@ionic/react";
import useNavigation from "navigation/useNavigation";
import Icon from "components/primitives/Icon";

function NewBookmarkFab({}) {
  let { navigate } = useNavigation();
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton onClick={() => navigate("/collections/new")}>
        <Icon name="add" />
      </IonFabButton>
    </IonFab>
  );
}

export default React.memo(NewBookmarkFab);
