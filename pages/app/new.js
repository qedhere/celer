import * as React from "react";
import { useUser } from "@components/hooks";
import { Button, useToasts, Loading, Divider, Input } from "@geist-ui/core";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import { uid } from "uid";
import { XIcon, ShareIcon, QuestionIcon } from "@primer/octicons-react";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import { doc, setDoc, getFirestore, updateDoc } from "firebase/firestore";
import Image from "next/image";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const db = getFirestore(app);

const postID = uid();
const uiDate = new Date();

export default function App() {
  const router = useRouter();
  const { setToast } = useToasts();
  const { user, loading, data } = useUser();
  const [tagList, setTagList] = React.useState([]);
  const [tagInput, setTagInput] = React.useState("");
  const [textAreaValue, setTextAreaValue] = React.useState("");
  const [titleErrorText, setTitleErrorText] = React.useState(" ");
  const [titleValue, setTitleValue] = React.useState("");

  const updateTags = (e) => {
    e.preventDefault();

    if (tagList.length < 7) {
      if (0 < tagInput.length && tagInput.length < 25) {
        if (tagInput.match(/^[a-zA-Z0-9]+$/)) {
          if (!tagList.includes(tagInput)) {
            setTagList([...tagList, tagInput]);
            setTagInput("");
          }
        }
      }
    }
  };

  const shareNote = async () => {
    if (titleValue === 0) {
      setTitleErrorText("Title cannot be empty.");
    } else if (titleValue.match(/^\s+$/)) {
      setTitleErrorText("Title cannot be empty.");
    } else if (titleValue > 64) {
      setTitleErrorText("Title cannot be longer than 64 characters.");
    } else {
      await setDoc(
        doc(
          db,
          "users",
          user.email,
          "notes",
          postID
        ),
        {
          title: titleValue,
          content: textAreaValue,
          likes: 0,
          views: 0,
          tags: tagList,
          timestamp: new Date().toString(),
        }
      );

      var updatedTags = data.tags;
      
      // Check if tag list is empty
      if (tagList.length > 0) {
        for (var i in tagList) {
          console.log(tagList[i]);
          if (tagList[i] in data.tags) {
            updatedTags[tagList[i]].push(postID);
            console.log(updatedTags);
          } else {
            updatedTags[tagList[i]] = [postID];
          }
        }
      } else {
        // Add to the "Unlisted" tag
        updatedTags["Unlisted"].push(postID);
      }

      await updateDoc(
        doc(
          db,
          "users",
          user.email
        ),
        {
          tags: updatedTags,
        },
      );

      // router.push("/" + user.email.slice(0, user.email.indexOf("@")) + "/" + postID);
      
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
            <div className="font-mono text-sm text-gray-500">{postID}</div>
            <input
              className="placeholder:text-gray-300 sm:text-5xl text-4xl font-bold tracking-tighter w-full"
              placeholder="Note Title"
              value={titleValue}
              onChange={(e) => {
                if (e.target.value.length === 0) {
                  setTitleErrorText("Title cannot be empty.");
                  setTitleValue(e.target.value);
                } else if (e.target.value.match(/^\s+$/)) {
                  setTitleErrorText("Title cannot be empty.");
                  setTitleValue(e.target.value);
                } else if (e.target.value.length > 64) {
                  setTitleErrorText(
                    "Title cannot be longer than 64 characters."
                  );
                } else {
                  setTitleValue(e.target.value);
                  setTitleErrorText(" ");
                }
              }}
            ></input>
            <div className="text-sm text-error-300 mb-5">{titleErrorText}</div>
            <form onSubmit={updateTags}>
              <div className="flex flex-wrap rounded-xl w-fit">
                <div className="flex gap-2 flex-wrap w-fit">
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
                    className=" placeholder:text-gray-400 text-sm"
                    placeholder="Add some tags! (max 7)"
                    value={tagInput}
                    onChange={(e) => {
                      if (e.target.value.length < 25) {
                        setTagInput(e.target.value);
                      }
                    }}
                  ></input>
                ) : (
                  <input
                    className="ml-2 w-fit placeholder:text-gray-400 text-sm"
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
        <article className="max-w-[900px] prose prose-black grow">
          <ReactMarkdown
            className="mt-10"
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {textAreaValue}
          </ReactMarkdown>
        </article>
        <div className="w-full h-[200px]"></div>
        <Divider />
        <div className="flex mt-5">
          <div className="flex items-center gap-2">
            <DiceAvatar user={user.email} size={36} noBorder />
            <div className="text-gray-500 w-0 h-0 invisible sm:visible sm:w-auto sm:h-auto">
              {user.email.slice(0, user.email.indexOf("@"))} &bull;{" "}
              {moment(new Date(uiDate)).fromNow()}
            </div>
          </div>
          <div className="grow"></div>
          <button className="mr-5 text-gray-400 hover:text-gray-600 duration-200">
            <QuestionIcon size={24} />
          </button>
          <Button type="success" onClick={shareNote}>
            Share!
          </Button>
        </div>
        <div className="w-full flex">
          <textarea
            className="grow mt-20 h-[300px] border resize-none p-4 font-mono rounded-xl bg-neutral-100"
            value={textAreaValue}
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
            placeholder="Write your note here..."
          ></textarea>
        </div>
        <div className="w-full h-[200px]"></div>
      </Body>
    </div>
  );
}
