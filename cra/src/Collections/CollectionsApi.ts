import { FirebaseItem, saveDbItem, getDbItemsByUser } from "fire/firestore.utils";
import { FirebaseUser } from "fire/firebase";
import kebabCase from "lodash/kebabCase";

export interface Collection extends FirebaseItem {
  title: string;
  image?: string;
  slug?: string;
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
    console.log("Saving", toSave);
    return saveDbItem(this.db, "collections", toSave, this.user) as Promise<Collection>;
  };
  createDefaultItems = async () => {
    return Promise.all([
      this.save({
        title: "To Read",
        image:
          "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1350&q=80",
      }),
      this.save({
        title: "To Watch",
        image:
          "https://images.unsplash.com/photo-1548328928-34db1c5fcc1f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      }),
      this.save({
        title: "Curated",
        image:
          "https://images.unsplash.com/photo-1529957018945-07aed3538ad5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      }),
    ]);
  };
}
