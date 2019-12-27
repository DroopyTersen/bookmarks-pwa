import { useFirestore, useUser } from "reactfire";
import { FirebaseUser } from "./firebase";
import pick from "lodash/pick";
export function useFirebase() {
  let firestore = useFirestore();
  let user = useUser();
  return {
    db: firestore(),
    currentUser: pick(user, "uid", "displayName", "photoURL", "email") as FirebaseUser,
  };
}
