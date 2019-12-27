import React, { useCallback } from "react";
import { Link as ReachLink } from "@reach/router";
import useNavigation from "./useNavigation";

export interface LinkProps {
  // props

  to: string;
  [key: string]: any;
}

const Link: React.FC<LinkProps> = ({ children, to = "/", ...rest }) => {
  let { navigate } = useNavigation();
  let onClick = (e) => {
    navigate(to);
    e.preventDefault();
  };
  return (
    <a {...rest} href={to} onClick={onClick}>
      {children}
    </a>
  );
};

export default Link;
