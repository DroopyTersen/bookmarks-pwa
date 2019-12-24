import { FirebaseItem } from "../firebase/firestore.utils";

export interface Collection extends FirebaseItem {
  title: string;
  slug?: string;
}

export interface Bookmark {
  key?: string;
  slug?: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
  collectionKey?: string;
  tags?: string[];
}

export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
}
