import { Collection, CollectionsApi } from "./CollectionsApi";
import { useReducer, useEffect } from "react";
import { useFirebase } from "fire/useFirebase";
import { stat } from "fs";

export enum FormStatus {
  Saving = "saving-collection",
  Loading = "loading-collection",
  Error = "error",
  Valid = "valid-collection",
  Incomplete = "incomplete-collection",
}

let reducer = function(state: CollectionFormState, action: any): CollectionFormState {
  var item: Collection = null;
  switch (action.type) {
    case "update-item":
      item = {
        ...state.item,
        [action.key]: action.value,
      };
      return {
        ...state,
        item,
        status: validateCollection(item) ? FormStatus.Valid : FormStatus.Incomplete,
      };
    case "load-item-start": {
      return {
        ...state,
        status: FormStatus.Loading,
      };
    }
    case "load-item-error": {
      return {
        ...state,
        status: FormStatus.Error,
      };
    }
    case "load-item-success":
      return {
        ...state,
        item: action.item,
        status: validateCollection(action.item) ? FormStatus.Valid : FormStatus.Incomplete,
      };
    case "save-start":
      return {
        ...state,
        status: FormStatus.Saving,
      };
    case "save-success":
      return {
        ...state,
        item: {
          ...state.item,
          ...action.item,
        },
        status: FormStatus.Valid,
      };
    case "save-error":
      return {
        ...state,
        status: FormStatus.Error,
      };
  }

  return state;
};

export default function useCollectionForm(itemKey: string = "") {
  let [state, dispatch] = useReducer(reducer, getDefaultState(itemKey));
  let { db, currentUser } = useFirebase();
  let api = new CollectionsApi(db, currentUser);

  useEffect(() => {
    let isMounted = true;
    if (itemKey) {
      let doAsync = async () => {
        try {
          dispatch({ type: "load-item-start" });
          let item = await api.getByKey(itemKey);
          if (isMounted) {
            if (item) {
              dispatch({ type: "load-item-success", item });
            } else {
              throw new Error("Null Collection");
            }
          }
        } catch (err) {
          dispatch({ type: "load-item-error" });
        }
      };
      doAsync();
    }
    return () => (isMounted = false);
  }, [itemKey]);

  const save = async () => {
    if (state.status === FormStatus.Valid) {
      dispatch({ type: "save-start" });
      let savedItem = await api.save(state.item);
      console.log("Save Success", savedItem);
      dispatch({ type: "save-success", item: savedItem });
      return savedItem;
    }
  };

  return {
    ...state,
    save,
    update: (key: string, value: any) => dispatch({ type: "update-item", key, value }),
  };
}
export interface CollectionFormState {
  item: Collection;
  status: FormStatus;
}

const getDefaultState = (collectionKey: string): CollectionFormState => {
  return {
    item: {
      title: "",
      image: "/images/bookmark.png",
    },
    status: collectionKey ? FormStatus.Loading : FormStatus.Incomplete,
  };
};

const validateCollection = (collection: Collection) => {
  return collection.title;
};
