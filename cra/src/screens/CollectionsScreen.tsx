import React, { useEffect } from "react";
import ScreenLayout from "./ScreenLayout";
import CollectionsList from "Collections/CollectionsList";
import { useFooterCommands } from "app/Footer";
import useNavigation from "navigation/useNavigation";

function CollectionsScreen({ ...rest }) {
  let { navigate } = useNavigation();
  let { set: setFooterCommands } = useFooterCommands();

  useEffect(() => {
    let cmd = { text: "+ Collection", onClick: () => navigate("/collections/new") };
    setFooterCommands([cmd]);
  }, [setFooterCommands]);

  return (
    <ScreenLayout title="Collections" backUrl="/">
      <CollectionsList />
    </ScreenLayout>
  );
}

export default React.memo(CollectionsScreen);
