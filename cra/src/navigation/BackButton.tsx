import React, { useCallback } from "react";
import { IonButton, IonIcon, IonBackButton } from "@ionic/react";
import useNavigation from "./useNavigation";
function BackButton({ fallback }: BackButtonProps) {
  let { goBack } = useNavigation();

  return (
    <IonButton onClick={() => goBack(fallback)}>
      <i style={{ fontSize: "24px" }} slot="icon-only" className="ion-md-arrow-round-back"></i>
      {/* <IonIcon name="arrow-round-back"></IonIcon> */}
    </IonButton>
  );
}

export default React.memo(BackButton);

export interface BackButtonProps {
  fallback: string;
}
