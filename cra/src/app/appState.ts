import { useFirebase } from "fire/useFirebase";
import { useEffect, useMemo } from "react";
import { useGlobalState } from "hooks/useGlobalState";
import { byCreatedBy } from "fire/firestore.utils";
import { getCache, setCache } from "utils/cache";
import { Collection, CollectionsApi, createDefaultCollections } from "Collections/CollectionsApi";
import { Bookmark } from "Bookmarks/BookmarksApi";
import orderBy from "lodash/orderBy";

let _subscriptionHandlers = {};

let subscribeToItems = (
  key: string,
  ref: firebase.firestore.Query,
  handler: (item: any[]) => void
) => {
  let alreadyListening = _subscriptionHandlers[key];
  _subscriptionHandlers[key] = handler;
  if (!alreadyListening) {
    console.log("SUBSCRIBING", key);

    ref.onSnapshot((snapshot) => {
      let items = [];
      snapshot.forEach((doc) => items.push(doc.data()));
      console.log("SNAPSHOT CHANGE", snapshot, items);
      _subscriptionHandlers[key](items);
    });
  }
};

export interface FirestoreCollectionActions<T> {
  replace: (items: T[]) => void;
}

export function useFirestoreCollection<T>(collection: string) {
  let { db, currentUser } = useFirebase();
  let cacheKey = "bookmarker-" + collection;

  let modifiers = useMemo(() => {
    return {
      replace: (state, items) => {
        setCache(cacheKey, items);
        state.set({ items });
      },
    };
  }, [cacheKey]);

  let globalState = useGlobalState<{ items: T[] }, FirestoreCollectionActions<T>>(
    collection,
    { items: getCache(cacheKey) },
    modifiers
  );

  let [state, actions] = globalState;

  useEffect(() => {
    let isMounted = true;

    if (db && currentUser) {
      let ref = byCreatedBy(db, collection, currentUser);
      subscribeToItems(collection, ref, (items) => {
        if (isMounted) actions.replace(items);
      });
    }
    return () => (isMounted = false);
  }, []);

  return globalState;
}

export function useCollections() {
  let [state] = useFirestoreCollection<Collection>("collections");

  let { db, currentUser } = useFirebase();
  let api = new CollectionsApi(db, currentUser);
  useEffect(() => {
    if (state.items && state.items.length === 0) {
      createDefaultCollections(api);
    }
  }, [state]);

  return {
    collections: orderBy(state.items || [], ["sortOrder", "title"], ["asc", "asc"]) as Collection[],
    remove: api.remove,
  };
}

export function useGlobalBookmarks() {
  let [state] = useFirestoreCollection<Bookmark>("bookmarks");

  return state.items || [];
}
