import * as React from "react";
import { useRouter } from "next/router";
import { Button, useToasts, Loading } from "@geist-ui/core";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import {
  EyeIcon,
  RepoIcon,
  HeartIcon,
  CommentDiscussionIcon,
} from "@primer/octicons-react";
import { app } from "@lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import moment from "moment";

const db = getFirestore(app);

export default function UserProfile() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState(null);
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
          console.log(data);
        } else {
          setLoading(false);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [router.query.user, userName, data]);

  if (!loading) {
    if (data) {
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
                  <div className="placeholder:text-gray-400 w-full h-[80px] text-sm p-0 m-0 resize-none rounded-lg p-2 focus:ring duration-500 ring-gray-100 overflow-hidden">
                    {data.aboutMe}
                  </div>
                </div>
              </div>
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
