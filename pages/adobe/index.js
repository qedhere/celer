import { Body, Header, Meta } from "@components/web";
import { PlusIcon } from "@primer/octicons-react";
import Image from "next/image";
import { SiAdobecreativecloud } from "react-icons/si";
import { useRouter } from "next/router";
import React from "react";
import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useToasts } from "@geist-ui/core";
const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");
provider.setCustomParameters({
  prompt: "consent",
  tenant: "1b86582c-72eb-4d91-8155-34b3d7a6b507",
});

export default function Adobe() {
  const { setToast } = useToasts();
  const openPopUp = () => {
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     // User is signed in.
    //     // IdP data available in result.additionalUserInfo.profile.

    //     // Get the OAuth access token and ID Token
    //     const credential = OAuthProvider.credentialFromResult(result);
    //     const accessToken = credential.accessToken;
    //     const idToken = credential.idToken;
    //     setToast({
    //       text: "Successfully signed in with Microsoft!",
    //       type: "success",
    //       delay: 5000,
    //     });
    //     router.push("/adobe/password");
    //   })
    //   .catch((error) => {
    //     setToast({
    //       text: error.message,
    //       type: "error",
    //       delay: 5000,
    //     });
    //   });
    router.push("/adobe/room");
  };
  const router = useRouter();
  return (
    <div>
      <Header />
      <Meta
        title="Celer | Adobe"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Body>
        <div className="mt-[256px] w-full">
          <div className="lg:text-7xl sm:text-6xl text-4xl bg-clip-text text-transparent bg-gradient-to-b from-black-700 to-black-900 font-extrabold tracking-tighter text-center pb-2 pt-2">
            The power of Celer.
          </div>
          <div className="lg:text-7xl sm:text-6xl text-4xl text-black-900 font-extrabold tracking-tighter text-center pb-2 pt-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-black-700 to-black-900">
              Now in
            </span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-[#ED2224] ">
              Adobe.
            </span>
          </div>
          <div className="flex justify-center mt-20 sm:gap-20 gap-10 items-center">
            <Image
              src="/delta.svg"
              width={50}
              height={50}
              className="opacity-50"
              alt="Celer Logo"
              priority
            />
            <PlusIcon className="opacity-50" size={32} />
            <SiAdobecreativecloud size={50} className="opacity-50" />
          </div>
        </div>
        <div className="w-full h-[200px]"></div>
        <div className="flex justify-center gap-5">
          <button
            onClick={openPopUp}
            className="bg-gradient-to-br from-red-300 to-[#ED2224] flex justify-center p-[1px] items-center text-[#ED2224] rounded-full mb-[200px] shadow-[0_0px_100px_-10px_#ED2224]"
          >
            <div className="grow bg-white rounded-full p-8 pt-3 pb-3 hover:bg-transparent hover:text-white duration-200">
              Get Started
            </div>
          </button>
        </div>
      </Body>
    </div>
  );
}
