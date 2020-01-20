import React, { useCallback } from "react";
import { Link as ReachLink } from "@reach/router";
import useNavigation from "./useNavigation";
import { useMenu } from "./MenuWrapper";
import { parse as parseUrl } from "url";

export interface LinkProps {
  // props
  href?: string;
  to?: string;
  [key: string]: any;
  target?: string;
}

const Link: React.FC<LinkProps> = ({ children, to = "", href = "", target = "", ...rest }) => {
  let { navigate } = useNavigation();
  let menu = useMenu();

  let onClick = (e) => {
    if (!href) {
      menu.setIsOpen(false);
      navigate(to);
      e.preventDefault();
    }
  };
  return (
    <a {...rest} target={target || calculateLinkTarget(href)} href={href || to} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;

const calculateLinkTarget = function(url) {
  if (!url) return "_self";
  try {
    let currentHost = window.location.host;
    let targetUrl = parseUrl(url);
    return window.innerWidth > 500 &&
      targetUrl.host &&
      targetUrl.host.toLowerCase() !== currentHost.toLowerCase()
      ? "_blank"
      : "_self";
  } catch (err) {
    return "_self";
  }
};
