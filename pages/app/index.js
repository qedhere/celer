import * as React from "react";
import { useUser } from "@components/hooks";
import { Button, useToasts, Loading } from "@geist-ui/core";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import {
  EyeIcon,
  RepoIcon,
  HeartIcon,
  CommentDiscussionIcon,
} from "@primer/octicons-react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { doc, updateDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

export default function App() {
  const router = useRouter();
  const { setToast } = useToasts();
  const { user, loading, data } = useUser();
  const [aboutMe, setAboutMe] = React.useState("");
  const [loadingOpacity, setLoadingOpacity] = React.useState(0);

  React.useEffect(() => {
    if (data) {
      setAboutMe(data.aboutMe);
    }
  }, [data]);

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

  const updateAboutMe = async () => {
    setLoadingOpacity(0.5);
    const userDataRef = doc(db, "users", user.email);

    await updateDoc(userDataRef, {
      aboutMe: aboutMe,
    });
    setLoadingOpacity(0);
  };
  if (loading)
    return (
      <div>
        <Meta
          title="Celer | App"
          description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
        />
        <Header />
        <Body>
          <div className="w-full mt-[256px]">
            <Loading />
          </div>
        </Body>
      </div>
    );
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
          <div className="flex mb-10 xs:justify-start items-center w-full gap-5 flex-wrap">
            <div className="w-[90px] h-[90px]">
              <DiceAvatar user={user.email} size={90} />
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tight">
                {user.email.slice(0, user.email.indexOf("@"))}
              </div>
              <div className="text-sm text-gray-500">
                Joined {moment(new Date(user.metadata.creationTime)).fromNow()}
              </div>
              <div className="text-sm text-gray-500">
                Last login{" "}
                {moment(new Date(user.metadata.lastSignInTime)).fromNow()}
              </div>
              <div className="flex items-center gap-5 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-2">
                  <RepoIcon /> {data.totalNotes}
                </div>
                <div className="flex items-center gap-2">
                  <EyeIcon /> {data.totalViews}
                </div>
                <div className="flex items-center gap-2">
                  <HeartIcon /> {data.totalViews}
                </div>
                <div className="flex items-center gap-2">
                  <CommentDiscussionIcon /> {data.totalViews}
                </div>
              </div>
            </div>
            <div className="grow h-full min-w-[200px] flex justify-center sm:max-w-none relative group">
              <textarea
                value={aboutMe}
                onBlur={updateAboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="About me (Click to edit)"
                className="placeholder:text-gray-400 w-full h-[80px] text-sm p-0 m-0 resize-none rounded-lg p-2 focus:ring duration-500 ring-gray-100 overflow-hidden"
              ></textarea>
              <div
                className="absolute top-0 left-0 w-full h-full bg-gray-100 rounded-md pointer-events-none duation-1000"
                style={{ opacity: loadingOpacity }}
              >
                <Loading />
              </div>
            </div>
          </div>

          <Button onClick={logOut} type="error" ghost>
            Log Out
          </Button>
        </div>
      </Body>
    </div>
  );
}
