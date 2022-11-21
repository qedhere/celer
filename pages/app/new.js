import * as React from "react";
import { useUser } from "@components/hooks";
import { Button, useToasts, Loading, Divider, Input } from "@geist-ui/core";
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
  XIcon,
} from "@primer/octicons-react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";

const db = getFirestore(app);

export default function App() {
  const router = useRouter();
  const { setToast } = useToasts();
  const { user, loading, data } = useUser();
  const [tagList, setTagList] = React.useState([]);
  const [tagInput, setTagInput] = React.useState("");

  const updateTags = (e) => {
    e.preventDefault();
    if (0 < tagInput.length && tagInput.length < 25) {
      // Check Regex
      if (tagInput.match(/^[a-zA-Z0-9]+$/)) {
        // Check if tag already exists
        if (!tagList.includes(tagInput)) {
          setTagList([...tagList, tagInput]);
          setTagInput("");
        }
      }
    }
  };

  if (loading)
    return (
      <div>
        <Meta
          title="Celer | New"
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
          title="Celer | New"
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
        title="Celer | New"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="w-full mt-[256px]">
          <div>
            <form onSubmit={updateTags}>
              <div className="flex flex-wrap border rounded-xl focus:border-success-300 p-4">
                <div className="flex gap-2 flex-wrap">
                  {tagList.map((tag) => (
                    <div className="flex items-center gap-2" key={tag}>
                      <div className="text-sm font-semibold text-gray-500 bg-gray-100 pl-4 pr-4 pt-1 pb-1 rounded-full flex items-center gap-2">
                        {tag}
                        <div
                          className="text-gray-300 hover:text-gray-500 duration-200"
                          onClick={() => {
                            setTagList(tagList.filter((item) => item !== tag));
                          }}
                        >
                          <XIcon />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {tagList.length === 0 ? (
                  <input
                    className=""
                    placeholder="Add some tags!"
                    value={tagInput}
                    onChange={(e) => {
                      if (e.target.value.length < 25) {
                        setTagInput(e.target.value);
                      }
                    }}
                  ></input>
                ) : (
                  <input
                    className="ml-2 w-fit"
                    value={tagInput}
                    onChange={(e) => {
                      if (e.target.value.length < 25) {
                        setTagInput(e.target.value);
                      }
                    }}
                  ></input>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-[200px] "></div>
      </Body>
    </div>
  );
}
