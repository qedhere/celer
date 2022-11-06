import * as React from "react";
import styles from "@styles/Home.module.css";
import { Body, Header, Meta } from "@components/web";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const [heroText, setHeroText] = React.useState(styles.heroText1);
  const [opacity, setOpacity] = React.useState([1, 0, 0]);
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
                    setOpacity([0, 1, 0]);
                  },
                  "latex.",
                  2000,
                  "",
                  () => {
                    setHeroText(styles.heroText3);
                    isBlink(styles.blink);
                    setOpacity([0, 0, 1]);
                  },
                  "markdown.",
                  2000,
                  "",
                  () => {
                    setHeroText(styles.heroText1);
                    isBlink(styles.blink);
                    setOpacity([1, 0, 0]);
                  },
                ]}
                wrapper="span"
                cursor={false}
                repeat={Infinity}
              />
            </div>
            <div className={`${styles.defaultBlink} ${blink} ${heroText}`}>
              I
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-[256px]">
          <button
            className={`rounded-lg w-[196px] h-[48px] flex justify-center items-center pb-[8px] relative`}
          >
            <div
              className={`flex justify-center items-center p-[1px] bg-black w-full h-full rounded-lg absolute ${styles.bg1} duration-1000`}
              style={{ opacity: opacity[0] }}
            ></div>
            <div
              className={`flex justify-center items-center p-[1px] bg-black w-full h-full rounded-lg absolute ${styles.bg2} duration-1000`}
              style={{ opacity: opacity[1] }}
            ></div>
            <div
              className={`flex justify-center items-center p-[1px] bg-black w-full h-full rounded-lg absolute ${styles.bg3} duration-1000`}
              style={{ opacity: opacity[2] }}
            ></div>
            <div className="bg-white w-full h-full rounded-lg flex justify-center items-center absolute hover:bg-transparent hover:text-white duration-200">
              Get Started
            </div>
          </button>
        </div>
      </Body>
    </div>
  );
}
