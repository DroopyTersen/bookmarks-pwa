import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import React from "react";
import Sidebar from "react-sidebar";
import MenuContent from "./MenuContent";

const mql = window.matchMedia(`(min-width: 800px)`);

const defaultValues: MenuState = {
  isOpen: false,
  isDocked: !!mql.matches,
};

export const MenuContext = React.createContext(defaultValues);

export function useMenu(): MenuState {
  return useContext(MenuContext);
}

function useMenuController(): MenuState {
  let [isDocked, setIsDocked] = useState(() => !!mql.matches);
  let [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleMediaQueryChange = () => {
      setIsDocked(!!mql.matches);
    };
    mql.addListener(handleMediaQueryChange);
    return () => mql.removeListener(handleMediaQueryChange);
  });

  return {
    isDocked,
    isOpen,
    toggleOpen: useCallback(() => setIsOpen((isOpen) => !isOpen), []),
    setIsOpen,
  };
}

export interface MenuState {
  isOpen: boolean;
  isDocked: boolean;
  toggleOpen?: () => void;
  setIsOpen?: (isOpen: boolean) => void;
}

const MenuWrapper: React.FC = function({ children }) {
  let menu = useMenuController();
  console.log("MENU", menu);
  useEffect(() => {
    setTimeout(() => {
      if (menu.isDocked || menu.isOpen) {
        menu.setIsOpen(true);
      }
    }, 1000);
  }, []);

  return (
    <MenuContext.Provider value={menu}>
      <Sidebar
        // touchHandleWidth={12}
        onSetOpen={menu.setIsOpen}
        open={menu.isOpen}
        sidebarClassName="bookmarker-menu-sidebar"
        docked={menu.isDocked}
        sidebar={<MenuContent />}
      >
        {children}
      </Sidebar>
    </MenuContext.Provider>
  );
};

export default MenuWrapper;
