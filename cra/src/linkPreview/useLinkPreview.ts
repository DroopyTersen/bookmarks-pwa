import React from "react";
import { cachify } from "../utils/cache";
import useAsyncData from "hooks/useAsyncData";
import { previewLink, LinkPreview } from "./linkPreview.api";

export default function useLinkPreview(linkUrl: string) {
  let { data, isLoading, error } = useAsyncData<LinkPreview>({ url: linkUrl }, previewLink, [
    linkUrl,
  ]);

  return data;
}
