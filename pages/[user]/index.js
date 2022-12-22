import * as React from "react";
import { useRouter } from "next/router";
import { Button, useToasts, Loading, Select, Popover } from "@geist-ui/core";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import {
  EyeIcon,
  RepoIcon,
  HeartIcon,
  CommentDiscussionIcon,
  FeedRepoIcon,
  ArrowRightIcon,
  PlusIcon,
} from "@primer/octicons-react";
import { app } from "@lib/firebase";
import {
  doc,
  getDoc,
  getFirestore,
  getDocs,
  collection,
} from "firebase/firestore";
import moment from "moment";
import Image from "next/image";

const db = getFirestore(app);

export default function UserProfile() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const [notes, setNotes] = React.useState(null);
  const [currentSort, setCurrentSort] = React.useState([]);
  const router = useRouter();
  const userName = router.query.user;

  React.useEffect(() => {
    if (userName) {
      const fetchData = async () => {
        const docRef = doc(db, "users", userName + "@celer.vercel.app");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLoading(false);
          setData(docSnap.data());
        } else {
          setLoading(false);
        }
        setLoading(false);
      };
      fetchData();
      const fetchNotesData = async () => {
        const posts = await getDocs(
          collection(db, "users", userName + "@celer.vercel.app", "notes")
        );

        const unsortedPosts = posts.docs.map((doc) => doc.data());
        const sortedPosts = unsortedPosts.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNotes(sortedPosts);
      };

      fetchNotesData();
    }
  }, [userName]);

  if (!loading) {
    if (data) {
      return (
        <div>
          <Meta
            title={"Celer | " + userName}
            description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
          />
          <Header />
          <Body>
            <div className="w-full mt-[256px]">
              <div className="flex mb-10 xs:justify-start items-center w-full gap-5 flex-wrap">
                <div className="w-[90px] h-[90px]">
                  <DiceAvatar user={userName + "@celer.vercel.app"} size={90} />
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">
                    {userName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Joined {moment(new Date(data.joinedDate)).fromNow()}
                  </div>
                  <div className="text-sm text-gray-500">
                    Last login {moment(new Date(data.lastLogin)).fromNow()}
                  </div>
                  <div className="flex items-center gap-5 text-xs text-gray-500 mt-2">
                    <div className="flex items-center gap-2">
                      <RepoIcon /> {data.totalNotes}
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <EyeIcon /> {data.totalViews}
                    </div>
                    <div className="flex items-center gap-2">
                      <HeartIcon /> {data.totalViews}
                    </div>
                    <div className="flex items-center gap-2">
                      <CommentDiscussionIcon /> {data.totalViews}
                    </div> */}
                  </div>
                </div>
                <div className="grow h-full min-w-[200px] flex justify-center sm:max-w-none relative group">
                  <div className="placeholder:text-gray-400 w-full h-[80px] text-sm p-0 m-0 resize-none rounded-lg p-2 focus:ring duration-500 ring-gray-100 overflow-hidden">
                    {data.aboutMe}
                  </div>
                </div>
              </div>
              <div className="mt-20 flex flex-wrap gap-5">
                <div className="text-2xl flex gap-2 items-center tracking-tighter font-bold">
                  <FeedRepoIcon size={24} className="" />
                  My Notes
                </div>
                <div className="grow"></div>
                <div className="grow w-full pr-4">
                  <Select
                    placeholder="Search..."
                    multiple
                    width="100%"
                    onChange={(val) => {
                      setCurrentSort(val);
                    }}
                  >
                    {Object.keys(data.tags).map((tag) => {
                      return (
                        <Select.Option value={tag} key={tag}>
                          {tag}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              {notes.length > 1 ? (
                <div className="min-h-[300px] w-full flex relative">
                  <div className="mt-5 flex flex-wrap gap-2">
                    {notes.map((note) => {
                      if (note.id != "00000000000") {
                        if (
                          currentSort.every((val) => note.tags.includes(val))
                        ) {
                          return (
                            <div
                              key={note.id}
                              className="p-4 border relative rounded-xl h-fit max-w-[264px] bg-gradient-to-b from-gray-50 to-gray-100 shadow-md hover:shadow-xl duration-500"
                            >
                              <div className="font-mono text-xs text-gray-500">
                                {note.id}
                              </div>
                              <div className="flex">
                                <div className="font-bold tracking-tighter text-xl truncate">
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
                                {/* <div className="flex items-center gap-2">
                                    <EyeIcon /> {data.totalViews}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <HeartIcon /> {data.totalViews}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CommentDiscussionIcon /> {data.totalViews}
                                  </div> */}
                                <div className="w-[128px]"></div>
                                <div className="grow"></div>
                                <div className="">
                                  <button
                                    className="p-2 rounded-full duration-200 hover:bg-[#0070f320] flex items-center justify-center text-success-300"
                                    onClick={() =>
                                      router.push(
                                        "/" + userName + "/" + note.id
                                      )
                                    }
                                  >
                                    <ArrowRightIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      }
                    })}
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
                    {userName} has no notes yet!
                  </div>
                </div>
              )}
            </div>
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
            <div className="w-full mt-[256px]">404</div>
          </Body>
        </div>
      );
    }
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
