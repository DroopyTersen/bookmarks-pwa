import React, { useCallback } from "react";
import { Link as ReachLink } from "@reach/router";
import useNavigation from "./useNavigation";
import { useMenu } from "./MenuWrapper";

export interface LinkProps {
  // props
  href?: string;
  to?: string;
  [key: string]: any;
}

const Link: React.FC<LinkProps> = ({ children, to = "", href = "", ...rest }) => {
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
    <a {...rest} href={href || to} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;
