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

  const updateTags = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
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
              <div className="flex border">
                <input className=""></input>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full h-[200px] "></div>
      </Body>
    </div>
  );
}
