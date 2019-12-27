import { useFirestoreCollectionData, useFirebaseApp, useUser } from "reactfire";
import { CollectionsApi, Collection } from "./CollectionsApi";

import { byCreatedBy } from "fire/firestore.utils";
import orderBy from "lodash/orderBy";
import { useFirebase } from "fire/useFirebase";
import useAsyncData from "hooks/useAsyncData";
import { useState, useEffect } from "react";
export default function useCollections() {
  let { db, currentUser } = useFirebase();
  //   let data: Collection[] = useFirestoreCollectionData(query);
  let [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    let isMounted = true;
    let doAsync = async () => {
      console.log("DOING ASYNC");
      let api = new CollectionsApi(db, currentUser);
      let data = await api.getAll();

      if (isMounted) {
        setCollections(orderBy(data, ["title"]));
        if (!data.length) {
          await api.createDefaultItems();
          data = await api.getAll();
          if (isMounted) {
            setCollections(orderBy(data, ["title"]));
          }
        }
      }
    };
    doAsync();
    return () => (isMounted = false);
  }, [currentUser.uid]);
  return {
    items: collections,
  };
}
