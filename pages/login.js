import * as React from "react";

import { Header, Body } from "@components/web"
import { useUser } from "@components/hooks"
import { createAvatar } from '@dicebear/avatars';
import { uid } from 'uid';
import * as style from '@dicebear/micah';
import Image from "next/image";
import { Button } from "@geist-ui/core"
import { PlusIcon } from "@primer/octicons-react";

export default function Login(){
  const {user, loading} = useUser();
  const [seed, setSeed] = React.useState(uid());

  React.useEffect(() => {
    console.log(user, loading);
  })

  let svg = createAvatar(style, {
    seed: seed,
    dataUri: true
  });

  return (
    <div>
      <Header/>
      <Body>
        <div className="w-full mt-[256px]">
          <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">PICK AN AVATAR</div>
          <div className="text-xl font-semibold tracking-tighter text-center">Your journey begins here.</div>
          <div className="flex justify-center w-full mt-20">
            <div className="border rounded-full p-8 flex justify-center items-center">
              <Image src={svg} width={100} height={100} alt="Avatar"/>
            </div>
          </div>
          <div className="w-full flex justify-center mt-20">
            <button type="success" onClick={() => setSeed(uid())} className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center">
              <PlusIcon size={24}/>
            </button>
          </div>
        </div>
      </Body>
    </div>
  )
}