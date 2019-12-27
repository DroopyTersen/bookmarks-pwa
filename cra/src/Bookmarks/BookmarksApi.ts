import kebabCase from "lodash/kebabCase";
import { FirebaseUser } from "fire/firebase";

import { getDbItemsByUser, getDbItem, saveDbItem, FirebaseItem } from "fire/firestore.utils";

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
  user: FirebaseUser;
  constructor(db, user: FirebaseUser) {
    this.db = db;
    this.user = user;
  }
  makeKey = (item: Bookmark) => {
    return item.slug + this.user.uid;
  };

  makeSlug = (item: Bookmark) => {
    return kebabCase(item.title.slice(0, 60));
  };
  getAll = async (): Promise<Bookmark[]> => {
    let items = await getDbItemsByUser(this.db, COLLECTION_NAME, this.user);
    return items as Bookmark[];
  };
  getByKey = async (key: string) => {
    return getDbItem(this.db, COLLECTION_NAME, key) as Promise<Bookmark>;
  };

  save = async (item: Bookmark): Promise<Bookmark> => {
    if (!item.title) {
      throw new Error("bookmarks.save: You must specify a title");
    }
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
    return saveDbItem(this.db, COLLECTION_NAME, toSave, this.user) as Promise<Bookmark>;
  };
}
