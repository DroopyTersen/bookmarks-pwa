import React from "react";
import { Router } from "@reach/router";

import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";
import ScreenThree from "./screens/ScreenThree";
import NewBookmark from "./screens/NewBookmarkScreen";
import Nav from "./components/appShell/Nav";
import { getCurrentUser } from "./firebase/firebase";

function App({}) {
  let currentUser = getCurrentUser();
  return (
    <div className="app">
      <Nav currentUser={currentUser} />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Router>
          <ScreenOne path="/one" default />
          <NewBookmark path="/share-target" />
          <NewBookmark path="/new" />
          <ScreenTwo path="/two" />
          <ScreenTwo path="/two/:id" />
          <ScreenThree path="/three" />
        </Router>
      </React.Suspense>
    </div>
  );
}

export default App;
