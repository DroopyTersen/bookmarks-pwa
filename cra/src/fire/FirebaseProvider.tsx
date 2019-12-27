import React from "react";
import { FirebaseAppProvider, SuspenseWithPerf, useAuth, AuthCheck } from "reactfire";
import "firebase/performance";

import firebaseConfig from "./firebase.config";
import {
  preloadFirestoreDoc,
  useFirebaseApp,
  preloadUser,
  preloadAuth,
  preloadFirestore,
  preloadDatabase,
  preloadStorage,
} from "reactfire";
import { AuthButton } from "./FirebaseAuth";

// Our components will lazy load the
// SDKs to decrease their bundle size.
// Since we know that, we can start
// fetching them now
const preloadSDKs = (firebaseApp: firebase.app.App) => {
  return Promise.all([
    preloadFirestore(firebaseApp),
    preloadDatabase(firebaseApp),
    preloadStorage(firebaseApp),
    preloadAuth(firebaseApp),
  ]);
};

const defaultPreloadData = async (firebaseApp) => {
  // const user = await preloadUser(firebaseApp);
  // if (user) {
  // 	//   preloadFirestoreDoc(
  // 	// 	firestore => firestore.doc('count/counter'),
  // 	// 	firebaseApp
  // 	//   );
  // }
};

export interface FirebaseProviderProps {
  preloadData?: (firebaseApp: firebase.app.App) => Promise<any>;
}
const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children, preloadData, ...rest }) => {
  let app = useFirebaseApp();
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig} initPerformance>
      <SuspenseWithPerf traceId="load-app" fallback={"Loading..."}>
        <InnerApp preloadData={preloadData}>{children}</InnerApp>
      </SuspenseWithPerf>
    </FirebaseAppProvider>
  );
};

export interface InnerAppProps {
  preloadData?: (firebaseApp: firebase.app.App) => Promise<void>;
}
const InnerApp: React.FC<InnerAppProps> = ({
  children,
  preloadData = defaultPreloadData,
  ...rest
}) => {
  const firebaseApp = useFirebaseApp();
  // Kick off fetches for SDKs and data that
  // we know our components will eventually need.
  //
  // This is OPTIONAL but encouraged as part of the render-as-you-fetch pattern
  // https://reactjs.org/docs/concurrent-mode-suspense.html#approach-3-render-as-you-fetch-using-suspense
  preloadSDKs(firebaseApp).then((firebaseApp) => preloadData(firebaseApp));
  return (
    <>
      <AuthCheck fallback={<AuthButton />}>{children}</AuthCheck>
    </>
  );
};

export default FirebaseProvider;

export const FirebaseSuspense = SuspenseWithPerf;
