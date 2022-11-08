import * as React from "react";
import styles from "@styles/Home.module.css";
import { Body, Header, Meta } from "@components/web";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon, RepoIcon, ShareIcon } from "@primer/octicons-react";
import { IoLogoPython } from "react-icons/io5";

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
        <div className="mt-[128px] xs:mt-[192px] sm:mt-[256px]">
          <div className="flex justify-center items-center sm:justify-none sm:items-auto">
            <div
              className={`md:text-6xl lg:text-7xl xs:text-5xl text-5xl max-w-[330px] xs:max-w-none font-extrabold tracking-tighter pb-2 flex items-center sm:gap-2 flex flex-wrap sm:justify-center duration-200 h-[150px] xs:pl-8 xs:pr-8`}
            >
              <span className={`pb-[6px] ${styles.textGradient}`}>
                Instantly share stunning
              </span>{" "}
              <div className={`${heroText} mt-[0px] xs:mt-0`}>
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
                className={`${blink} ${heroText} md:text-6xl lg:text-7xl xs:text-5xl text-5xl font-thin`}
              >
                I
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center sm:mt-[256px] xs:mt-[178px] mt-[100px] gap-8 flex-wrap">
          <button
            className={`rounded-lg w-full max-w-[320px] xs:w-[196px] h-[48px] flex justify-center items-center mb-[-20px] relative border border-transparent hover:border-black overflow-hidden ${styles.button}`}
          >
            <Link href="/docs" className="flex justify-center items-center">
              <div className="bg-black text-white z-10 w-full h-full flex justify-center items-center absolute hover:bg-transparent hover:text-black duration-200">
                Learn more
              </div>
            </Link>
          </button>
          <button
            className={`rounded-lg w-full max-w-[320px] xs:w-[196px] h-[48px] flex justify-center items-center pb-[2px] mb-20 relative`}
          >
            <Link
              href="/docs"
              className="flex justify-center items-center"
              style={{ color: "inherit" }}
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
            </Link>
          </button>
        </div>
        <div className="">
          <div className="flex items-center gap-4">
            <div className="ml-[6px] flex items-center justify-center mb-4">
              <RepoIcon size={24} className="text-gray-500" />{" "}
              <span className="text-gray-500 ml-2 text-sm font-bold tracking-tight">
                Why Celer?
              </span>
            </div>
          </div>
          <div className="ml-4 h-[50px] bg-gradient-to-b from-transparent to-gray-300 w-[1px]"></div>
          <div className="ml-4 h-[150px] bg-gradient-to-b from-gray-300 to-[#0070f3] w-[1px]"></div>
          <div className="ml-4 h-[50px] bg-gradient-to-b from-[#0070f3] to-transparent w-[1px]"></div>
          <div>
            <div
              className={`${styles.heroText1} font-bold tracking-tighter text-lg mb-2 mt-4 w-fit`}
            >
              Free
            </div>
            <div
              className={`text-4xl ${styles.textGradient} font-bold tracking-tighter max-w-[420px] z-30`}
              style={{ textShadow: "20px 20px 100px #FFFFFF" }}
            >
              Because knowledge was meant to be free.
            </div>
            <div
              className={`text-xl tracking-tight max-w-[420px] z-30 mt-4 text-gray-400`}
              style={{ textShadow: "20px 20px 100px #FFFFFF" }}
            >
              Unleash your creativity without limits.
            </div>
            <button className="bg-[#0070f315] pl-4 pr-4 pt-1 pb-1 rounded-full mt-5 text-[#0070f3] flex items-center gap-2 hover:bg-[#0070f325] duration-200">
              Learn more <ArrowRightIcon />
            </button>
          </div>
          <div className="flex justify-center relative w-full">
            <div className="max-w-[500px] p-10 mt-10 no-select no-drag">
              <Image
                src="/equations/wave-equation.svg"
                width={300}
                height={300}
                alt="Wave Equation"
              />
              <div className="font-bold tracking-tighter mt-10">
                Schrödinger equation
              </div>
              <div className="text-sm max-w-[320px]">
                The Schrödinger equation governs the wave function of a
                quantum-mechanical system.{" "}
              </div>
            </div>
            <div className="absolute top-[-20px] left-[180px] opacity-20 blur-[5px] no-select no-drag">
              <Image
                src="/equations/field-equation.svg"
                width={300}
                height={300}
                alt="Wave Equation"
              />
              <div className="font-bold tracking-tighter mt-10">
                Einstein field equations
              </div>
              <div className="text-sm max-w-[320px]">
                The Einstein field equations relate the geometry of spacetime to
                the distribution of matter within it.{" "}
              </div>
            </div>
            <div className="absolute bottom-[0px] right-[100px] opacity-30 blur-[2px] no-select no-drag">
              <Image
                src="/equations/fourier-equation.svg"
                width={300}
                height={300}
                alt="Wave Equation"
              />
              <div className="font-bold tracking-tighter mt-10">
                Fourier transform
              </div>
              <div className="text-sm max-w-[320px]">
                A Fourier transform is a mathematical transform that decomposes
                functions into frequency components.{" "}
              </div>
            </div>
          </div>
          <div className="mt-[-250px]">
            <div className="ml-4 h-[100px] bg-gradient-to-b from-transparent to-[#0070f3] w-[1px]"></div>
            <div className="ml-4 h-[150px] bg-gradient-to-b from-[#0070f3] to-[#7928ca] w-[1px]"></div>
            <div className="ml-4 h-[100px] bg-gradient-to-b from-[#7928ca] to-transparent w-[1px]"></div>
            <div>
              <div
                className={`${styles.heroText2} font-bold tracking-tighter text-lg mb-2 mt-4 w-fit`}
              >
                Shared
              </div>
              <div
                className={`text-4xl ${styles.textGradient} font-bold tracking-tighter max-w-[420px] z-30`}
                style={{ textShadow: "20px 20px 100px #FFFFFF" }}
              >
                Because knowledge was meant to be shared.
              </div>
              <div
                className={`text-xl tracking-tight max-w-[420px] z-30 mt-4 text-gray-400`}
                style={{ textShadow: "20px 20px 100px #FFFFFF" }}
              >
                Instantly share your work with anyone.
              </div>
              <button className="bg-[#7928ca15] pl-4 pr-4 pt-1 pb-1 rounded-full mt-5 text-[#7928ca] flex items-center gap-2 hover:bg-[#7928ca25] duration-200">
                Learn more <ArrowRightIcon />
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center relative w-full h-[300px]">
            <div
              className={`min-w-[270px] p-4 rounded-lg bg-gray-100 font-mono flex text-sm text-gray-500 shadow-lg relative`}
            >
              /app/gWgwZ3L4qH
              <div className="grow"></div>
              <div className="text-[#7928ca]">
                <ShareIcon size={18} />
              </div>
              <div className="absolute right-[-10px]">
                <Image
                  src="/cursor.svg"
                  width={48}
                  height={48}
                  className="z-50"
                  alt="Cursor"
                />
              </div>
            </div>
          </div>
          <div className="mt-[-250px]">
            <div className="ml-4 h-[100px] bg-gradient-to-b from-transparent to-[#7928ca] w-[1px]"></div>
            <div className="ml-4 h-[150px] bg-gradient-to-b from-[#7928ca] to-[#ff4d4d] w-[1px]"></div>
            <div className="ml-4 h-[100px] bg-gradient-to-b from-[#ff4d4d] to-transparent w-[1px]"></div>
            <div>
              <div
                className={`${styles.heroText3} font-bold tracking-tighter text-lg mb-2 mt-4 w-fit`}
              >
                Open
              </div>
              <div
                className={`text-4xl ${styles.textGradient} font-bold tracking-tighter max-w-[420px] z-30`}
                style={{ textShadow: "20px 20px 100px #FFFFFF" }}
              >
                Because knowledge was meant to be open.
              </div>
              <div
                className={`text-xl tracking-tight z-30 mt-4 text-gray-400`}
                style={{ textShadow: "20px 20px 100px #FFFFFF" }}
              >
                Celer is an open source foundation.
              </div>
              <button className="bg-[#ff4d4d15] pl-4 pr-4 pt-1 pb-1 rounded-full mt-5 text-[#ff4d4d] flex items-center gap-2 hover:bg-[#ff4d4d25] duration-200">
                Learn more <ArrowRightIcon />
              </button>
            </div>
            <div className="flex justify-center relative w-full text-gray-400 mt-20">
              <div className="max-w-[600px] grow bg-[#21262c] rounded-xl">
                <div className="flex">
                  <div className="flex items-center gap-2 p-4 rounded-t-xl bg-[#282C34EE]">
                    <IoLogoPython /> celer.py
                  </div>
                </div>
                <div className="p-4 bg-[#282C34] rounded-tr-0 rounded-b-xl shadow-xl font-mono whitespace-nowrap">
                  <span className="text-[#61AFEF]">print</span>
                  <span className="text-[#D19A66]">&#40;</span>
                  <span className="text-[#98C379]">
                    &quot;Did you know celer is open source?&quot;
                  </span>
                  <span className="text-[#D19A66]">&#41;</span>
                  <br />
                  <span className="text-[#61AFEF]">print</span>
                  <span className="text-[#D19A66]">&#40;</span>
                  <span className="text-[#98C379]">
                    &quot;That&apos;s right, it&apos;s on GitHub!&quot;
                  </span>
                  <span className="text-[#D19A66]">&#41;</span>
                  <br />
                  <span className="text-[#61AFEF]">print</span>
                  <span className="text-[#D19A66]">&#40;</span>
                  <span className="text-[#98C379]">
                    &quot;Anyone can contribute to the project.
                  </span>
                  <span className="text-[#D19A66]">&#41;</span>
                  <br />
                  <span className="text-[#61AFEF]">print</span>
                  <span className="text-[#D19A66]">&#40;</span>
                  <span className="text-[#98C379]">
                    &quot;You can also report bugs or request features.
                  </span>
                  <span className="text-[#D19A66]">&#41;</span>
                  <br />
                  <span className="text-[#61AFEF]">print</span>
                  <span className="text-[#D19A66]">&#40;</span>
                  <span className="text-[#98C379]">
                    &quot;Check it out at{" "}
                    <a
                      className="underline text-[#ff4d4d]"
                      href="https://github.com/qedhere/celer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://github.com/qedhere/celer
                    </a>
                  </span>
                  <span className="text-[#D19A66]">&#41;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-20">
          <div className="w-[50px] xs:w-[75px] sm:w-[100px] bg-gradient-to-l from-gray-300 to-white pt-[1px] pb-[1px] flex justify-center items-center">
            <div className="w-[50px] xs:w-[75px] sm:w-[100px] bg-gradient-to-l from-gray-100 to-white h-full"></div>
          </div>
          <div className="w-full h-[200px] bg-gray-100 border-t border-b border-gray-300 flex justify-center items-center gap-5 text-gray-400"></div>
          <div className="w-[50px] xs:w-[75px] sm:w-[100px] bg-gradient-to-r from-gray-300 to-white pt-[1px] pb-[1px] flex justify-center items-center">
            <div className="w-[50px] xs:w-[75px] sm:w-[100px] bg-gradient-to-r from-gray-100 to-white h-full"></div>
          </div>
        </div>
      </Body>
      <div className="h-[64px] md:h-[100px] w-full"></div>
    </div>
  );
}
