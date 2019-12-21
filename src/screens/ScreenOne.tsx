import React, { useEffect, useState } from "react";
import Layout, { BaseScreenProps } from "../components/appShell/Layout";
import api from "../data/api";
import { Bookmark } from "../data/interfaces";

export default function ScreenOne({ location }: BaseScreenProps) {
  let [collections, setCollections] = useState([]);
  let [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  useEffect(() => {
    let doAsync = async () => {
      let items = await api.collections.getAll();
      setCollections(items);
      let bmarks = await api.bookmarks.getAll();
      setBookmarks(bmarks);
    };
    doAsync();
  }, []);
  return (
    <Layout>
      <>
        <h1>Screen One</h1>
        <div>Welcome to Droopy Frontend!</div>
        <ul>
          {collections.map((c) => (
            <li>{c.title}</li>
          ))}
        </ul>
        <ul>
          {bookmarks.map((b) => (
            <li key={b.key}>
              <a href={b.url}>{b.title}</a>
            </li>
          ))}
        </ul>
      </>
    </Layout>
  );
}
