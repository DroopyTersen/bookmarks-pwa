import React, { useState } from "react";
import useCollections from "./useCollections";
import { PickerSingle } from "components/Picker/Picker";
import { IonButton, IonActionSheet } from "@ionic/react";

function CollectionPicker({ onChange, value }: CollectionPickerProps) {
  let { items: collections } = useCollections();
  let [selectedKey, setSelectedKey] = useState(() => {
    if (value) return value;
    if (collections?.length) return collections[0].key;
  });
  let [isOpen, setIsOpen] = useState(false);
  let selected = collections.find((c) => c.key === selectedKey);
  //   console.log("Picker options", options);
  return (
    <>
      <IonButton size="default" fill="outline" onClick={() => setIsOpen(true)}>
        {selected.title}
      </IonButton>
      <IonActionSheet
        header="Choose a Collection"
        isOpen={isOpen}
        onDidDismiss={() => setIsOpen(false)}
        buttons={collections.map((collection) => ({
          text: collection.title,
          handler: () => {
            setSelectedKey(collection.key);
            setIsOpen(false);
          },
        }))}
      />
    </>
  );
}

export default React.memo(CollectionPicker);

export interface CollectionPickerProps {
  value: string;
  onChange: (value: string) => void;
}
