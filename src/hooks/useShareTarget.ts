import useLocation from "./useLocation";
import useLinkPreview from "./useLinkPreview";

export default function useShareTarget() {
  // let location = useLocation();
  let raw = getSharedDataFromQueryString(window.location.href);
  let url = raw.url || (checkIsUrl(raw.description) ? raw.description : "");
  console.log(raw, checkIsUrl(raw.description), url);

  let linkPreview = useLinkPreview(url);

  return {
    raw,
    url,
    image: linkPreview?.image,
    description: linkPreview?.description || raw.description,
    title: raw.title || linkPreview?.title,
  };
}

const getSharedDataFromQueryString = function(url: string) {
  const parsedUrl = new URL(url);
  return {
    title: parsedUrl.searchParams.get("title"),
    url: parsedUrl.searchParams.get("url"),
    description: parsedUrl.searchParams.get("description"),
  };
};

const checkIsUrl = function(str: string) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
  return urlRegex.test(str);
};
