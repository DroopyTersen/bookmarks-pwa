import kebabCase from "lodash/kebabCase";
import { getCurrentUser, getDb } from "fire/firebase";

import {
  getDbItemsForCurrentUser,
  getDbItem,
  saveDbItem,
  FirebaseItem,
} from "fire/firestore.utils";

export interface Bookmark extends FirebaseItem {
  key?: string;
  slug?: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
  collectionKey?: string;
  tags?: string[];
}

const COLLECTION_NAME = "bookmarks";

export default class BookmarksApi {
  db: any;
  constructor(db: any) {
    this.db = db;
  }
  makeKey = (item: Bookmark) => {
    return item.slug + getCurrentUser().uid;
  };

  makeSlug = (item: Bookmark) => {
    return kebabCase(item.title.slice(0, 60));
  };
  getAll = async (): Promise<Bookmark[]> => {
    let items = await getDbItemsForCurrentUser(this.db, COLLECTION_NAME);
    return items as Bookmark[];
  };
  getByKey = async (key: string) => {
    return getDbItem(this.db, COLLECTION_NAME, key) as Promise<Bookmark>;
  };

  save = async (item: Bookmark): Promise<Bookmark> => {
    if (!item.title) {
      throw new Error("bookmarks.save: You must specify a title");
    }
    // if (!item.collectionKey) {
    //   throw new Error("bookmarks.save: You must specifiy a collectionKey");
    // }
    if (!item.slug) {
      item.slug = this.makeSlug(item);
    }
    if (!item.tags) {
      item.tags = [];
    }
    let existing = await this.getByKey(item.key);
    let toSave = {
      ...existing,
      ...item,
    };
    if (!toSave.key) {
      toSave.key = this.makeKey(item);
    }
    return saveDbItem(this.db, COLLECTION_NAME, toSave) as Promise<Bookmark>;
  };
}
