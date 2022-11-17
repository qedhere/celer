import * as React from "react";
import "@lib/firebase";
import { getAuth } from "firebase/auth";

export default function useUser() {
  const auth = getAuth();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      setLoading(false);
    });
  }, [auth]);

  return { user, loading };
}
