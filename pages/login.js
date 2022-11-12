import * as React from "react";

import { Header, Body } from "@components/web"
import { useUser } from "@components/hooks"
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';
import Image from "next/image";

export default function Login(){
  const {user, loading} = useUser();

  React.useEffect(() => {
    console.log(user, loading);
  })

  let svg = createAvatar(style, {
    seed: 'iHxp',
    dataUri: true
  });

  return (
    <div>
      <Header/>
      <Body>
        <div className="w-full mt-[256px]">
          <div className="text-xl font-semibold tracking-tighter text-center">Your journey begins here.</div>
          <div className="flex justify-center w-full mt-20">
            <div className="border rounded-full p-8 flex justify-center items-center">
              <Image src={svg} width={100} height={100} alt="Avatar"/>
            </div>
          </div>
        </div>
      </Body>
    </div>
  )
}