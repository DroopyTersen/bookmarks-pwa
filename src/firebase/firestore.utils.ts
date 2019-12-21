import uuid from "uuid/v4";
import { User } from "../data/interfaces";
import { getCurrentUser } from "./firebase";
export interface FirebaseItem {
  key?: string;
  modified?: string;
  created?: string;
  createdBy?: User;
  _timestamp?: number;
  [key: string]: any;
}

export const getDbItems = async function(db: any, collection: string, query?: (ref) => any) {
  console.log("getDbItems", collection);
  let ref = db.collection(collection);
  let req = query ? query(ref).get() : ref.get();
  let snapshot = await req;
  return snapshot.docs.map((doc) => doc.data()) as FirebaseItem[];
};

export const getDbItemsForCurrentUser = async function(
  db: any,
  collection: string,
  query?: (ref) => any
) {
  console.log("getDbItems", collection);
  let ref = db.collection(collection).where("createdBy.uid", "==", getCurrentUser().uid);
  let req = query ? query(ref).get() : ref.get();
  let snapshot = await req;
  return snapshot.docs.map((doc) => doc.data()) as FirebaseItem[];
};

export const getDbItem = async function(
  db: any,
  collection: string,
  key: string
): Promise<FirebaseItem> {
  try {
    console.log("getDbItem", collection, key);
    let doc = await db
      .collection(collection)
      .doc(key)
      .get();
    return doc.data();
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const removeDbItem = async function(db, collection: string, key: string) {
  if (!db || !collection || !key)
    throw new Error("Unable to remove firebase item. Invalid params.");
  await db
    .collection(collection)
    .doc(key)
    .delete();
};

export const saveDbItem = async function(db, collection: string, item: FirebaseItem) {
  item._timestamp = Date.now();
  item.modified = new Date().toISOString();

  if (!item.key) {
    item.key = uuid();
  }
  if (!item.created) {
    item.created = new Date().toISOString();
  }
  if (!item.createdBy) {
    item.createdBy = getCurrentUser();
  }
  console.log("Saving DB item", item);
  await db
    .collection(collection)
    .doc(item.key)
    .set(item, { merge: true });

  return getDbItem(db, collection, item.key);
};

export const subscribe = (dbRef: any, handler: (type, item) => void) => {
  return dbRef.where("_timestamp", ">", Date.now()).onSnapshot(function(snapshot) {
    snapshot.docChanges().forEach(function(change) {
      handler(change.type, change.doc.data() as FirebaseItem);
    });
  });
};

export const saveDbItems = async function(db, collection, items: FirebaseItem[]) {
  let batch = db.batch();
  items.forEach((item) => {
    if (!item.key) {
      item.key = uuid();
    }
    if (!item.created) {
      item.created = new Date().toISOString();
    }
    if (!item.createdBy) {
      item.createdBy = getCurrentUser();
    }
    item._timestamp = Date.now();
    let ref = db.collection(collection).doc(item.key);
    batch.set(ref, item, { merge: true });
  });

  return batch.commit();
};
