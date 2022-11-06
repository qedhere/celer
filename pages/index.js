import * as React from "react";
import styles from "@styles/Home.module.css";
import { Body, Header, Meta } from "@components/web";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [heroText, setHeroText] = React.useState(styles.heroText1);
  const [buttonBackground, setButtonBackground] = React.useState(styles.bg1);
  const [blink, isBlink] = React.useState("");
  return (
    <div>
      <Meta
        title="Celer"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="mt-[128px] sm:mt-[256px]">
          <div className="text-6xl font-bold tracking-tighter pb-2 flex items-center gap-2 flex flex-wrap justify-center duration-200">
            Instantly share stunning{" "}
            <div className={heroText}>
              <TypeAnimation
                sequence={[
                  "notes.",
                  2000,
                  "",
                  () => {
                    setHeroText(styles.heroText2);
                    isBlink(styles.blink);
                    setButtonBackground(styles.bg2);
                  },
                  "latex.",
                  2000,
                  "",
                  () => {
                    setHeroText(styles.heroText3);
                    isBlink(styles.blink);
                    setButtonBackground(styles.bg3);
                  },
                  "markdown.",
                  2000,
                  "",
                  () => {
                    setHeroText(styles.heroText1);
                    isBlink(styles.blink);
                    setButtonBackground(styles.bg1);
                  },
                ]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
              />
            </div>
            <div className={`${styles.blink} ${heroText}`}>
              I
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[256px]">
          <button className={`rounded-lg w-[196px] h-[48px] flex justify-center items-center pb-[1px]`}>
            <div className="flex justify-center items-center p-[1px] bg-black w-full h-full rounded-lg">
            <div className="bg-white w-full h-full rounded-lg flex justify-center items-center">Get Started</div>
            </div>
          </button>
        </div>
      </Body>
    </div>
  );
}
