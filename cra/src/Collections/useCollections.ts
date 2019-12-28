import { useFirestoreCollectionData, useFirebaseApp, useUser } from "reactfire";
import { Collection, CollectionsApi } from "./CollectionsApi";

import { byCreatedBy } from "fire/firestore.utils";
import orderBy from "lodash/orderBy";
import { useFirebase } from "fire/useFirebase";
export default function useCollections() {
  let { db, currentUser } = useFirebase();
  let api = new CollectionsApi(db, currentUser);
  let query = byCreatedBy(db, "collections", currentUser);
  let data = useFirestoreCollectionData(query);

  return {
    items: orderBy(data, ["sortOrder", "title"], ["asc", "asc"]) as Collection[],
    remove: api.remove,
  };
}
