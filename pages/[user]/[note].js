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
        console.log(data);
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
            title="Celer | App"
            description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
          />
          <Header />
          <Body>
            <div className="w-full mt-[256px]">
              {data.title}
              {data.content}
              {data.tags}
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
