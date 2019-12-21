import { kebabCase } from "lodash";
import { Collection, Bookmark } from "./interfaces";
import {
  getDbItems,
  saveDbItem,
  getDbItem,
  getDbItemsForCurrentUser,
} from "../firebase/firestore.utils";
import { getDb, getCurrentUser } from "../firebase/firebase";

const collections = {
  makeKey: (item: Collection) => {
    return item.slug + getCurrentUser().uid;
  },
  getAll: async (): Promise<Collection[]> => {
    let items = await getDbItemsForCurrentUser(getDb(), "collections");
    if (!items || !items.length) {
      await collections.createDefaultItems();
      items = await getDbItemsForCurrentUser(getDb(), "collections");
    }
    return items as Collection[];
  },
  getByTitle: async (title: string) => {
    let all = await collections.getAll();
    return all.find((c) => c.title === title);
  },
  save: async (item: Collection): Promise<Collection> => {
    if (!item.title) {
      throw new Error("collections.save: You must specify a Collection title");
    }
    if (!item.slug) {
      item.slug = kebabCase(item.title);
    }

    let existing = await collections.getByTitle(item.title);
    let toSave = {
      ...existing,
      ...item,
    };
    if (!toSave.key) {
      toSave.key = collections.makeKey(item);
    }
    return saveDbItem(getDb(), "collections", toSave) as Promise<Collection>;
  },
  createDefaultItems: async () => {
    return Promise.all([
      collections.save({ title: "To Read" }),
      collections.save({ title: "To Watch" }),
      collections.save({ title: "Curated" }),
    ]);
  },
};

const bookmarks = {
  makeKey: (item: Bookmark) => {
    return item.slug + getCurrentUser().uid;
  },
  makeSlug: (item: Bookmark) => {
    return kebabCase(item.title.slice(0, 60));
  },
  getAll: async (): Promise<Bookmark[]> => {
    let items = await getDbItemsForCurrentUser(getDb(), "bookmarks");
    return items as Bookmark[];
  },
  getByKey: async (key: string) => {
    return getDbItem(getDb(), "bookmarks", key) as Promise<Bookmark>;
  },
  save: async (item: Bookmark): Promise<Bookmark> => {
    if (!item.title) {
      throw new Error("bookmarks.save: You must specify a title");
    }
    // if (!item.collectionKey) {
    //   throw new Error("bookmarks.save: You must specifiy a collectionKey");
    // }
    if (!item.slug) {
      item.slug = bookmarks.makeSlug(item);
    }
    if (!item.tags) {
      item.tags = [];
    }
    let existing = await bookmarks.getByKey(item.key);
    let toSave = {
      ...existing,
      ...item,
    };
    if (!toSave.key) {
      toSave.key = collections.makeKey(item);
    }
    return saveDbItem(getDb(), "bookmarks", toSave) as Promise<Bookmark>;
  },
};

export default {
  collections,
  bookmarks,
};
