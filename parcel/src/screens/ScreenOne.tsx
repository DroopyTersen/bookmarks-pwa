import React, { useEffect, useState } from "react";
import Layout, { BaseScreenProps } from "../components/appShell/Layout";
import api from "../data/api";
import { Bookmark, Collection } from "../data/interfaces";
import { useNavigator, useCurrentRoute } from "../components/navigator/Navigator";
import useAsyncData from "../hooks/useAsyncData";
import ScreenLayout from "../components/appShell/ScreenLayout";

export default function ScreenOne({}) {
  let { collections } = useCollections();
  return (
    <ScreenLayout title="Collections">
      <div>
        {collections.map((c) => (
          <div key={c.key}>{c.title}</div>
        ))}
      </div>
    </ScreenLayout>
  );
}

export function useCollections() {
  let { data, isLoading, error } = useAsyncData<Collection[]>([], api.collections.getAll, []);

  return {
    collections: data,
    isLoading,
    error,
  };
}
