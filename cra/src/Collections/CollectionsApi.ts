import {
  FirebaseItem,
  saveDbItem,
  getDbItemsByUser,
  getDbItem,
  removeDbItem,
} from "fire/firestore.utils";
import { FirebaseUser } from "fire/firebase";
import kebabCase from "lodash/kebabCase";

import debounce from "lodash/debounce";
export interface Collection extends FirebaseItem {
  title: string;
  image?: string;
  slug?: string;
  sortOrder?: number;
  permissions?: "public" | "private";
}

export class CollectionsApi {
  db: any;
  user: FirebaseUser;
  constructor(db, user: FirebaseUser) {
    this.db = db;
    this.user = user;
  }
  makeKey = (item: Collection) => {
    return item.slug + this.user.uid;
  };
  getAll = async (): Promise<Collection[]> => {
    let items = await getDbItemsByUser(this.db, "collections", this.user);
    return items as Collection[];
  };
  getByTitle = async (title: string) => {
    let all = await this.getAll();
    return all.find((c) => c.title === title);
  };
  getByKey = async (key: string) => {
    return getDbItem(this.db, "collections", key);
  };
  remove = async (key: string) => {
    return removeDbItem(this.db, "collections", key);
  };
  save = async (item: Collection): Promise<Collection> => {
    if (!item.title) {
      throw new Error("collections.save: You must specify a Collection title");
    }
    if (!item.slug) {
      item.slug = kebabCase(item.title);
    }
    if (typeof item.sortOrder === "string") {
      item.sortOrder = parseInt(item.sortOrder || "99", 10);
    }

    let existing = await this.getByTitle(item.title);
    let toSave = {
      ...existing,
      ...item,
    };
    if (!toSave.key) {
      toSave.key = this.makeKey(item);
    }
    console.log("Saving", toSave);
    return saveDbItem(this.db, "collections", toSave, this.user) as Promise<Collection>;
  };
}

export let createDefaultCollections = debounce(async (api: CollectionsApi) => {
  let items = await api.getAll();
  if (items.length === 0) {
    return Promise.all([
      api.save({
        title: "To Read",
        sortOrder: 1,
        image: "https://cdn.pixabay.com/photo/2016/09/10/17/18/book-1659717_960_720.jpg",
      }),
      api.save({
        title: "To Watch",
        sortOrder: 2,
        image: "https://cdn.pixabay.com/photo/2017/08/10/03/00/youtube-2617510_960_720.jpg",
      }),

      api.save({
        title: "Recipes",
        sortOrder: 30,
        image: "https://cdn.pixabay.com/photo/2015/10/26/07/21/soup-1006694_960_720.jpg",
      }),
      api.save({
        title: "Travel",
        sortOrder: 40,
        image: "https://cdn.pixabay.com/photo/2016/01/09/18/27/old-1130731_960_720.jpg",
      }),
    ]);
  }
}, 500);
