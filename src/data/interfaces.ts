export interface Collection {
  id: string;
  title: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  image?: string;
  collectionId: string;
  tags: string[];
}

export interface User {
  uid: string;
  displayName: string;
  photoURL?: string;
  email?: string;
}
