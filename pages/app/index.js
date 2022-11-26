import * as React from "react";
import { useUser } from "@components/hooks";
import { Button, useToasts, Loading, Select } from "@geist-ui/core";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import {
  EyeIcon,
  RepoIcon,
  HeartIcon,
  CommentDiscussionIcon,
  FeedRepoIcon,
  PlusIcon,
  ArrowRightIcon,
  KebabHorizontalIcon,
} from "@primer/octicons-react";
import moment from "moment";
import {
  doc,
  updateDoc,
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import Image from "next/image";

const db = getFirestore(app);

export default function App() {
  const router = useRouter();
  const { setToast } = useToasts();
  const { user, loading, data } = useUser();
  const [aboutMe, setAboutMe] = React.useState("");
  const [notes, setNotes] = React.useState();
  const [loadingOpacity, setLoadingOpacity] = React.useState(0);

  React.useEffect(() => {
    if (data) {
      setAboutMe(data.aboutMe);
    }
    if (user) {
      const fetchNotesData = async () => {
        const posts = await getDocs(
          collection(db, "users", user.email, "notes")
        );
        setNotes(posts.docs.map((doc) => doc.data()));
      };

      fetchNotesData();
    }
  }, [data, user]);

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
  else {
    if (!user) {
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
                  <Button
                    type="secondary"
                    onClick={() => router.push("/signup")}
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </Body>
        </div>
      );
    } else {
      if (notes) {
        return (
          <div>
            <Meta
              title="Celer | App"
              description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
            />
            <Header />
            <Body>
              <div className="w-full mt-[256px]">
                <div className="flex mb-10 xs:justify-start items-center w-full gap-10 flex-wrap">
                  <div className="w-[90px] h-[90px]">
                    <DiceAvatar user={user.email} size={90} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight">
                      {user.email.slice(0, user.email.indexOf("@"))}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined{" "}
                      {moment(new Date(user.metadata.creationTime)).fromNow()}
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
                <div className="flex gap-2 mb-10">
                  <button
                    onClick={() =>
                      router.push(
                        "/" + user.email.slice(0, user.email.indexOf("@"))
                      )
                    }
                    className="bg-black-900 text-white pl-4 pr-4 pt-1 border border-black-900 pb-1 text-sm rounded-full hover:bg-transparent hover:text-black-900 duration-200"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={logOut}
                    className="bg-[#e00e0020] text-error-200 pl-4 pr-4 pt-1 pb-1 text-sm rounded-full hover:bg-[#e00e0035] duration-200"
                  >
                    Log Out
                  </button>
                </div>
                <div className="mt-20 flex">
                  <div className="text-2xl flex gap-2 items-center tracking-tighter font-bold">
                    <FeedRepoIcon size={24} className="" />
                    My Notes
                  </div>
                  <div className="grow"></div>
                  <Select placeholder="Search..." multiple width="200px">
                    {Object.keys(data.tags).map((tag) => {
                      return (
                        <Select.Option value={tag} key={tag}>
                          {tag}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>

                {notes.length > 1 ? (
                  <div className="min-h-[300px] w-full flex relative">
                    <div className="mt-5 flex flex-wrap gap-2">
                      {notes.map((note) => {
                        if (note.id != "00000000000") {
                          return (
                            <div
                              key={note.id}
                              className="p-4 border relative rounded-xl h-fit max-w-[300px] bg-gradient-to-b from-gray-50 to-gray-100 shadow-md hover:shadow-xl duration-500"
                            >
                              <div className="absolute top-0 right-0 pr-4 pt-2">
                                <button className="text-gray-400">
                                  <KebabHorizontalIcon />
                                </button>
                              </div>
                              <div className="font-mono text-xs text-gray-500">
                                {note.id}
                              </div>
                              <div className="flex">
                                <div className="font-bold tracking-tighter text-xl">
                                  {note.title}
                                </div>
                                <div className="grow"></div>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {note.tags.map((tag) => (
                                  <div
                                    className="text-[8pt] bg-gray-200 rounded-full pl-2 pr-2 text-gray-500"
                                    key={tag}
                                  >
                                    {tag}
                                  </div>
                                ))}
                              </div>
                              <div className="text-sm mt-2 text-gray-500 whitespace-wrap truncate h-[50px]">
                                {note.content}
                              </div>
                              <div className="flex items-center gap-2 text-gray-500">
                                <div className="flex items-center gap-2">
                                  <EyeIcon /> {data.totalViews}
                                </div>
                                <div className="flex items-center gap-2">
                                  <HeartIcon /> {data.totalViews}
                                </div>
                                <div className="flex items-center gap-2">
                                  <CommentDiscussionIcon /> {data.totalViews}
                                </div>
                                <div className="grow"></div>
                                <div className="">
                                  <button className="p-2 rounded-full duration-200 hover:bg-[#0070f320] flex items-center justify-center text-success-300">
                                    <ArrowRightIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                    <div className="absolute right-0 bottom-0">
                      <button
                        onClick={() => router.push("/app/new")}
                        className="bg-[transparent] w-[45px] h-[45px] rounded-full flex items-center border border-2 border-dashed border-success-100 justify-center hover:bg-[#0070f320] duration-200 hover:border-solid"
                      >
                        <PlusIcon className="text-success-300" size={24} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] w-full flex flex-col justify-center items-center relative">
                    <div className="w-full flex justify-center">
                      <Image
                        src="/mona-loading.gif"
                        width={75}
                        height={75}
                        alt="Loading GIF"
                        priority
                      />
                    </div>
                    <div className="text-gray-500 text-sm mt-5">
                      You have no notes yet. Create one!
                    </div>
                    <div className="absolute right-0 bottom-0">
                      <button
                        onClick={() => router.push("/app/new")}
                        className="bg-[transparent] w-[45px] h-[45px] rounded-full flex items-center border border-2 border-dashed border-success-100 justify-center hover:bg-[#0070f320] duration-200 hover:border-solid"
                      >
                        <PlusIcon className="text-success-300" size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-[200px] "></div>
            </Body>
          </div>
        );
      } else {
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
      }
    }
  }
}
