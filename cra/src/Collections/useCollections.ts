import { useDatabase } from "reactfire";
import { CollectionsApi, Collection } from "./CollectionsApi";
import useAsyncData from "hooks/useAsyncData";

export default function useCollections() {
  let db = useDatabase();
  let api = new CollectionsApi(db);
  let { data, isLoading, error } = useAsyncData<Collection[]>([], api.getAll, []);

  return {
    items: data,
  };
}
