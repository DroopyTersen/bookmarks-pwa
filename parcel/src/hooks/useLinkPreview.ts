import React from "react";
import useAsyncData from "./useAsyncData";
import { cachify } from "../utils/cache";

export default function useLinkPreview(linkUrl: string) {
  let { data, isLoading, error } = useAsyncData<LinkPreview>(
    { url: linkUrl },
    previewLinkWithCache,
    [linkUrl]
  );

  return data;
}

var previewLink = async function(linkUrl): Promise<LinkPreview> {
  if (!linkUrl) return { url: "" };
  const API_KEY = "5dfdb5c52d4bb8f14179f61cad1a80133387187c01092";
  let apiUrl = `https://api.linkpreview.net/?key=${API_KEY}&q=${linkUrl}`;
  let resp = await fetch(apiUrl);
  if (!resp.ok) {
    let error = await resp.text();
    throw new Error("Unable to preview link:" + error);
  }
  return resp.json();
};

const CACHE_DURATION = 1000 * 60 * 60 * 40;
const previewLinkWithCache = cachify(previewLink, {
  getCacheKey: (...args) => "LinkPreview-" + JSON.stringify(args),
  location: localStorage,
  duration: CACHE_DURATION,
});

export interface LinkPreview {
  title?: string;
  url: string;
  description?: string;
  image?: string;
}
