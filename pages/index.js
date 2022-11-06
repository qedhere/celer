import * as React from "react";
import { Body, Header, Meta } from "@components/web";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [heroText, setHeroText] = React.useState("heroText1");
  return (
    <div>
      <Meta
        title="Celer"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="mt-[128px] sm:mt-[256px]">
          <div className="text-5xl font-bold tracking-tighter pb-2 flex items-center gap-2 flex flex-wrap justify-center duration-200">
            Instantly share stunning{" "}
            <div className={heroText}>
              <TypeAnimation
                sequence={[
                  "notes.",
                  2000,
                  "",
                  () => setHeroText("heroText2"),
                  "latex.",
                  2000,
                  "",
                  () => setHeroText("heroText3"),
                  "markdown.",
                  2000,
                  "",
                  () => setHeroText("heroText1"),
                ]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[256px]"><button className="pl-4 pr-4">ok</button></div>
      </Body>
    </div>
  );
}
