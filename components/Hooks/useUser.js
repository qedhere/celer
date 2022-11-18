import * as React from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@lib/firebase";

const db = getFirestore(app);


export default function useUser() {
  const auth = getAuth();
  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(db, "users", user.email);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data())
      } else {
        setUser(false);
      }
      setLoading(false);
    });
  }, [auth]);

  return { user, loading, data };
}
