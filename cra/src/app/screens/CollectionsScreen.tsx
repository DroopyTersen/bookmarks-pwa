import React from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";

function CollectionsScreen({ ...rest }) {
  return (
    <ScreenLayout title="Collections">
      <CollectionsList />
    </ScreenLayout>
  );
}

export default React.memo(CollectionsScreen);
