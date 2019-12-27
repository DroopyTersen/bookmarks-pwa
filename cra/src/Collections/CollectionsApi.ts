import { FirebaseItem, saveDbItem, getDbItemsForCurrentUser } from "fire/firestore.utils";
import { getCurrentUser } from "fire/firebase";
import kebabCase from "lodash/kebabCase";

export interface Collection extends FirebaseItem {
  title: string;
  slug?: string;
}

export class CollectionsApi {
  db: any;
  constructor(db) {
    this.db = db;
  }
  makeKey = (item: Collection) => {
    return item.slug + getCurrentUser().uid;
  };
  getAll = async (): Promise<Collection[]> => {
    let items = await getDbItemsForCurrentUser(this.db, "collections");
    if (!items || !items.length) {
      await this.createDefaultItems();
      items = await getDbItemsForCurrentUser(this.db, "collections");
    }
    return items as Collection[];
  };
  getByTitle = async (title: string) => {
    let all = await this.getAll();
    return all.find((c) => c.title === title);
  };
  save = async (item: Collection): Promise<Collection> => {
    if (!item.title) {
      throw new Error("collections.save: You must specify a Collection title");
    }
    if (!item.slug) {
      item.slug = kebabCase(item.title);
    }

    let existing = await this.getByTitle(item.title);
    let toSave = {
      ...existing,
      ...item,
    };
    if (!toSave.key) {
      toSave.key = this.makeKey(item);
    }
    return saveDbItem(this.db, "collections", toSave) as Promise<Collection>;
  };
  createDefaultItems = async () => {
    return Promise.all([
      this.save({ title: "To Read" }),
      this.save({ title: "To Watch" }),
      this.save({ title: "Curated" }),
    ]);
  };
}
