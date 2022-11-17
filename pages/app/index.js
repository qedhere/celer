import { useUser } from "@components/hooks";
import { Button, useToasts } from "@geist-ui/core";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getAuth, signOut } from "firebase/auth";

export default function App() {
  const router = useRouter();
  const { setToast } = useToasts();
  const { user, loading } = useUser();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setToast({
          text: "Logged Out!",
          type: "success",
          delay: 5000,
        });
        router.push("/login");
      })
      .catch((error) => {
        setToast({
          text: error.code + " " + error.message,
          type: "error",
          delay: 5000,
        });
        router.push("/login");
      });
  };
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  return (
    <div>
      Logged in as {user.email.slice(0, user.email.indexOf("@"))}
      <Button onClick={logOut}>Log Out</Button>
    </div>
  );
}
