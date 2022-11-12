import * as React from "react";

import { Header, Body } from "@components/web"
import { useUser } from "@components/hooks"

export default function Login(){
  const {user, loading} = useUser();

  React.useEffect(() => {
    console.log(user, loading);
  })
  return (
    <div>
      <Header/>
      <Body>
        <div className="flex flex-col w-full mt-[256px]">
          <div className="grow text-xl font-semibold tracking-tighter text-center">Your journey begins here.</div>
          <div className="grow "></div>
        </div>
      </Body>
    </div>
  )
}