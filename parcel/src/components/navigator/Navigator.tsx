import { useState, useEffect, useMemo, useContext } from "react";
import React from "react";
import { Navigator as OnsenNavigator } from "react-onsenui";
import styled from "styled-components";

const CLASS_NAME = "navigator-container";

export interface NavigatorProps {
  // props
  className?: string;
  [key: string]: any;
  initialRoute: NavigatorRoute;
}

const Navigator: React.FC<NavigatorProps> = ({
  initialRoute,
  className = "",
  ...additionalProps
}) => {
  let cssClass = [CLASS_NAME, className].filter(Boolean).join(" ");
  return (
    <StyledNavigator
      {...additionalProps}
      className={cssClass}
      initialRoute={initialRoute}
      renderPage={renderPage}
    />
  );
};

const renderPage = (route: NavigatorRoute, navigator) => {
  return (
    <RouteContext.Provider value={route}>
      <NavigatorContext.Provider value={navigator}>
        <route.component key={route.key} />
      </NavigatorContext.Provider>
    </RouteContext.Provider>
  );
};

export default Navigator;

const StyledNavigator = styled(OnsenNavigator)`
  position: relative;
  display: inline-block;
  width: 100%;
`;

export const RouteContext = React.createContext(null);

export function useCurrentRoute() {
  return useContext(RouteContext);
}

export const NavigatorContext = React.createContext(null);

export function useNavigator() {
  return useContext(NavigatorContext);
}

export interface NavigatorRoute {
  component: any;
  key: string;
  props?: { [key: string]: any };
  [key: string]: any;
}

export interface Navigation {
  route: NavigatorRoute;
  navigator: {
    popPage: () => void;
    pushPage: (page: NavigatorRoute) => void;
  };
}

// // Wrap your components with the Provider, use the data hook to get a value for the provider
// function ExampleUsage() {
//   let { data } = useNavigationData();
//   return (
//     <NavigationContext.Provider value={data}>
//       <div>
//         Your app here
//         <ChildComponent />
//       </div>
//     </NavigationContext.Provider>
//   );
// }

// // Use the normal hook anywhere in your app (assuming you've wrapped it in a provider)
// function ChildComponent() {
//   let data = useNavigation();
//   return <div>{JSON.stringify(data, null, 2)}</div>;
// }
