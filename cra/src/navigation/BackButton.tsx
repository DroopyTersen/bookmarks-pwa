import React, { useCallback } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import useNavigation from "./useNavigation";
function BackButton({ fallback }: BackButtonProps) {
  let { goBack } = useNavigation();

  return (
    <IonButton onClick={() => goBack(fallback)}>
      <IonIcon slot="icon-only" name="arrow-round-back" />
    </IonButton>
  );
}

export default React.memo(BackButton);

export interface BackButtonProps {
  fallback: string;
}
