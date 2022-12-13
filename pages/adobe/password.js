import { Body, Header, Meta } from "@components/web";
import { PlusIcon } from "@primer/octicons-react";
import Image from "next/image";
import { SiAdobecreativecloud } from "react-icons/si";
import { useRouter } from "next/router";
import React from "react";
import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useToasts, Button, Input } from "@geist-ui/core";
const auth = getAuth();
const provider = new OAuthProvider("microsoft.com");
provider.setCustomParameters({
  prompt: "consent",
  tenant: "1b86582c-72eb-4d91-8155-34b3d7a6b507",
});

export default function AdobePassword() {
  const { setToast } = useToasts();
  const openPopUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
        setToast({
          text: "Successfully signed in with Microsoft!",
          type: "success",
          delay: 5000,
        });
        router.push("/adobe/password");
      })
      .catch((error) => {
        setToast({
          text: error.message,
          type: "error",
          delay: 5000,
        });
      });
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
          <div className="flex justify-center">
            <div className="flex flex-col gap-2 max-w-[300px]">
              <Input.Password placeholder="Password" />
              <Input.Password placeholder="Confirm Password" />
              <div className="flex justify-center gap-5 mt-10">
                <Button width={"100%"} className="">
                  Finish Sign Up
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[200px]"></div>
      </Body>
    </div>
  );
}
