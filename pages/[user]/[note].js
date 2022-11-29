import * as React from "react";
import { useRouter } from "next/router";
import { Loading, Divider, Link } from "@geist-ui/core";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import {
  EyeIcon,
  HeartIcon,
  CommentDiscussionIcon,
} from "@primer/octicons-react";
import { app } from "@lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import moment from "moment";

const db = getFirestore(app);

export default function UserProfile() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
  const router = useRouter();
  const userName = router.query.user;
  const noteId = router.query.note;

  React.useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(
        db,
        "users",
        userName + "@celer.vercel.app",
        "notes",
        noteId
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLoading(false);
        setData(docSnap.data());
      } else {
        setLoading(false);
      }
      setLoading(false);
    };

    if (userName) {
      if (noteId) {
        fetchData();
      }
    }
  }, [userName, noteId]);

  if (!loading) {
    if (data) {
      return (
        <div>
          <Meta
            title={"Celer | " + data.title}
            description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
          />
          <Header />
          <Body>
            <div className="w-full mt-[256px]">
              <div>
                <div className="font-mono text-sm text-gray-500">{data.id}</div>
                <div className="placeholder:text-gray-300 sm:text-5xl text-4xl font-bold tracking-tighter w-full">
                  {data.title}
                </div>
                <div className="flex flex-wrap rounded-xl w-fit">
                  <div className="flex gap-2 flex-wrap w-fit mt-5">
                    {data.tags.map((tag) => (
                      <div className="flex items-center gap-2" key={tag}>
                        <div className="text-sm font-semibold text-gray-500 bg-gray-100 pl-4 pr-4 pt-1 pb-1 rounded-full flex items-center gap-2">
                          {tag}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <article className="max-w-[900px] prose prose-black grow">
              <ReactMarkdown
                className="mt-10"
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {data.content}
              </ReactMarkdown>
            </article>
            <div className="w-full h-[200px]"></div>
            <Divider />
            <div className="flex mt-5">
              <div className="flex items-center gap-2">
                <DiceAvatar
                  user={userName + "@celer.vercel.app"}
                  size={36}
                  noBorder
                />
                <div className="text-gray-500 w-0 h-0 invisible sm:visible sm:w-auto sm:h-auto">
                  <Link href={"/" + userName} color underline>
                    {userName}
                  </Link>{" "}
                  &bull; {moment(new Date(data.timestamp)).fromNow()}
                </div>
              </div>
              <div className="grow"></div>
            </div>
            <div className="w-full h-[200px]"></div>
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
            <div className="w-full mt-[256px]">No data lol</div>
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
