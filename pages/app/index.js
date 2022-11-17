import { useUser } from "@components/hooks";
import { Button, useToasts, Loading } from "@geist-ui/core";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Header, Body, Meta } from "@components/web";

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
  if (loading) return (
    <div>
      <Meta
        title="Celer | App"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="w-full mt-[256px]">
          <Loading/>
        </div>
      </Body>
    </div>
  )
  if (!user)
    return (
      <div>
        <Meta
          title="Celer | App"
          description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
        />
        <Header />
        <Body>
          <div className="w-full mt-[256px]">
            <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
              ERROR 403
            </div>
            <div className="text-xl font-semibold tracking-tighter text-center">
              You are not logged in.
            </div>
            <div className="flex justify-center mt-20">
              <div className="flex flex-col gap-2">
                <Button onClick={() => router.push("/login")}>Log In</Button>
                <Button type="secondary" onClick={() => router.push("/signup")}>
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        </Body>
      </div>
    );
  return (
    <div>
      <Meta
        title="Celer | App"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="w-full mt-[256px]">
          <div>
            Logged in as {user.email.slice(0, user.email.indexOf("@"))}
            <Button onClick={logOut}>Log Out</Button>
          </div>
        </div>
      </Body>
    </div>
  );
}
