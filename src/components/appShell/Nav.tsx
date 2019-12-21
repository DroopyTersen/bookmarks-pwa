import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import useLocation from "../../hooks/useLocation";
import { User } from "../../data/interfaces";
const logoImage = require("../../images/icons/icon-72x72.png");

const testUrl = "https://web.dev/web-share-target/";
const testPath = `/share-target?description=${testUrl}`;
function Nav({ currentUser }: { currentUser: User }) {
  return (
    <StyledNav>
      <div className="nav-left">
        <Link to="/">
          <div className="centered logo">
            <img src={logoImage} />
          </div>
        </Link>
        <div className="nav-links">
          <NavLink path="/three">Collections</NavLink>
          <NavLink path={testPath}>Recent</NavLink>
        </div>
      </div>
      <div className="nav-right">
        <StyledCurrentUser title={currentUser.displayName}>
          <img src={currentUser.photoURL} />
        </StyledCurrentUser>
      </div>
    </StyledNav>
  );
}

export default React.memo(Nav);

const StyledCurrentUser = styled.div`
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 4px solid var(--primary-300);
  }
`;
const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  text-transform: uppercase;
  padding: 5px 10px;
  background: var(--primary-500);
  color: var(--white);

  position: fixed;
  top: 0px;
  width: 100%;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  .logo {
    background: var(--accent-100);
    border-radius: 50%;
    margin-right: 10px;
    text-decoration: none;
    height: 40px;
    width: 40px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .nav-left,
  .nav-right {
    display: flex;
    align-items: center;
  }
  .nav-links {
    display: flex;
    align-items: center;
    > a {
      margin-right: 10px;
      padding: 5px 10px;
      color: var(--light);
      border-bottom: 2px solid transparent;
    }
    > a.active {
      color: var(--white);
      border-bottom-color: var(--primary);
    }
  }
`;

export const checkIsActive = (location, path) => {
  // Current window.location.pathname must start with NavLink path
  return location.pathname.toLowerCase().indexOf(path.toLowerCase()) === 0;
};

export const NavLink = ({ path, children }) => {
  let location = useLocation();
  let cssClass = ["link", checkIsActive(location, path) ? "active" : ""].filter((c) => c).join(" ");
  return (
    <Link className={cssClass} to={path}>
      {children}
    </Link>
  );
};
