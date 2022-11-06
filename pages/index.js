import * as React from "react";
import styles from "@styles/Home.module.css";
import { Body, Header, Meta } from "@components/web";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

export default function Home() {
  const [heroText, setHeroText] = React.useState(styles.heroText1);
  const [opacity, setOpacity] = React.useState([1, 0, 0]);
  const [blink, isBlink] = React.useState("");
  const [shadow, setShadow] = React.useState(styles.shadow1);
  return (
    <div>
      <Meta
        title="Celer"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="mt-[128px] xs:mt-[192px] sm:mt-[256px]">
          <div className="flex justify-center items-center sm:justify-none sm:items-auto">
            <div className="md:text-6xl lg:text-7xl xs:text-5xl text-4xl max-w-[330px] xs:max-w-none font-bold tracking-tighter pb-2 flex items-center sm:gap-2 flex flex-wrap sm:justify-center duration-200 h-[100px] xs:pl-8 xs:pr-8">
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
              <div
                className={`${blink} ${heroText} md:text-6xl lg:text-7xl xs:text-5xl text-4xl font-thin`}
              >
                I
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:mt-[256px] xs:mt-[160px] mt-[64px] gap-8 flex-wrap mr-[32px]">
          <Link href="/docs">
            <button
              className={`rounded-lg w-full max-w-[320px] xs:w-[196px] h-[48px] flex justify-center items-center mb-[-20px] relative border border-black overflow-hidden ${styles.button}`}
            >
              <div className="bg-black text-white z-10 w-full h-full flex justify-center items-center absolute hover:bg-transparent hover:text-black duration-200">
                Learn more
              </div>
            </button>
          </Link>
          <Link href="/app" style={{ color: "inherit" }}>
            <button
              className={`rounded-lg w-full max-w-[320px] xs:w-[196px] h-[48px] flex justify-center items-center pb-[2px] mb-20 relative`}
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
              <div className="bg-white z-10 w-full h-full rounded-lg flex justify-center items-center absolute hover:bg-transparent hover:text-white duration-200">
                Get Started
              </div>
              <div
                className={`w-[196px] h-fit z-0 ${styles.shadow1} absolute duration-1000`}
                style={{ opacity: opacity[0] }}
              ></div>
              <div
                className={`w-[196px] h-fit z-0 ${styles.shadow2} absolute duration-1000`}
                style={{ opacity: opacity[1] }}
              ></div>
              <div
                className={`w-[196px] h-fit z-0 ${styles.shadow3} absolute duration-1000`}
                style={{ opacity: opacity[2] }}
              ></div>
            </button>
          </Link>
        </div>
      </Body>
    </div>
  );
}
