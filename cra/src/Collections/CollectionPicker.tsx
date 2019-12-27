import React from "react";
import useCollections from "./useCollections";
import { PickerSingle } from "components/Picker/Picker";

function CollectionPicker({ onChange, value }: CollectionPickerProps) {
  let { items } = useCollections();
  let options = (items || []).map((c) => ({ label: c.title, value: c.key }));
  //   console.log("Picker options", options);
  return (
    <PickerSingle
      name="collection"
      value={value || (options.length ? options[0].value : "")}
      onChange={onChange}
      options={options}
      creatable={true}
    />
  );
}

export default React.memo(CollectionPicker);

export interface CollectionPickerProps {
  value: string;
  onChange: (value: string) => void;
}
