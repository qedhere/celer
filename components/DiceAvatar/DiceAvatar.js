import * as React from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@lib/firebase";

const db = getFirestore(app);

import Image from "next/image";

export default function DiceAvatar(props) {
  const [svg, setSvg] = React.useState(null);
  React.useEffect(() => {
    if (props) {
      const fetchPfpHash = async () => {
        const docRef = doc(db, "users", props.user);
        const docSnap = await getDoc(docRef);
        setSvg(
          createAvatar(style, {
            seed: docSnap.data().pictureSeed,
            dataUri: true,
          })
        );
      };

      fetchPfpHash();
    }
  }, [props.user, props]);

  if (svg) {
    if (props.noBorder) {
      return (
        <Image
          src={svg}
          width={props.size}
          height={props.size}
          alt="Avatar"
          className="rounded-full"
        />
      );
    } else {
      return (
        <Image
          src={svg}
          width={props.size}
          height={props.size}
          alt="Avatar"
          className="rounded-full border"
        />
      );
    }
  } else {
    return (
      <div
        style={{ width: props.size, height: props.size }}
        className="rounded-full border"
      ></div>
    );
  }
}
