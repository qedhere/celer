import * as React from "react";
import { getAuth } from "firebase/auth";
import { app } from "@lib/firebase";

export default function useVerifiedUser() {
  const auth = getAuth(app);
  const [user, setUser] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        if (user.emailVerified) {
          setUser(user);
        } else {
          setUser(false);
        }
      } else {
        setUser(false);
      }
      setLoading(false);
    });
  }, [auth]);

  return { user, loading, data };
}
