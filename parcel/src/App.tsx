import React, { useEffect } from "react";
import "@ionic/react/css/ionic.bundle.css";

import {
  IonApp,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
} from "@ionic/react";

import { Router } from "@reach/router";
// import Navigator from "./components/navigator/Navigator";

// import ScreenOne from "./screens/ScreenOne";
// import ScreenTwo from "./screens/ScreenTwo";
// import ScreenThree from "./screens/ScreenThree";
// import NewBookmark from "./screens/NewBookmarkScreen";
// import Nav from "./components/appShell/Nav";

// import { getCurrentUser } from "./firebase/firebase";

// function App({}) {
//   let currentUser = getCurrentUser();
//   return (
//     <div className="app">
//       <Nav currentUser={currentUser} />
//       <React.Suspense fallback={<div>Loading...</div>}>
//         <Router>
//           <ScreenOne path="/one" default />
//           <NewBookmark path="/share-target" />
//           <NewBookmark path="/new" />
//           <ScreenTwo path="/two" />
//           <ScreenTwo path="/two/:id" />
//           <ScreenThree path="/three" />
//         </Router>
//       </React.Suspense>
//     </div>
//   );
// }

function App({}) {
  // let currentUser = getCurrentUser();
  useEffect(() => {
    document.querySelector("html")?.classList.add("hydrated");
  }, []);
  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {[1, 2, 3, 4, 5].map((item, idx) => (
              <IonItem>Item {idx}</IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </IonApp>
  );
  // return <Navigator initialRoute={{ component: ScreenOne, key: "screen-one" }} className="app" />;
}

export default App;
