import * as React from "react";

import { Header, Body, Meta } from "@components/web";
import { Input, useToasts, Link, Loading } from "@geist-ui/core";
import { CheckIcon } from "@primer/octicons-react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const db = getFirestore(app);

export default function SignUp() {
  const router = useRouter();
  const { setToast } = useToasts();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [logInIcon, setLogInIcon] = React.useState(<CheckIcon size={24} />);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError("");
    setErrorText("");
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setErrorText("");
  };

  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [errorText, setErrorText] = React.useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setLogInIcon(<Loading type="success" />);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username + "@celer.vercel.app", password)
      .then(async (userCredential) => {
        // Signed in
        setToast({
          text: "Logged In!",
          type: "success",
          delay: 5000,
        });
        const userDataRef = doc(db, "users", username + "@celer.vercel.app");

        await updateDoc(userDataRef, {
          lastLogin: new Date().toString(),
        });
        setLogInIcon(<CheckIcon size={24} />);
        router.push("/app");
        // ...
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setErrorText("Invalid username");
          setUsernameError("error");
        } else if (error.code === "auth/user-not-found") {
          setErrorText("User not found");
          setUsernameError("error");
        } else if (error.code === "auth/wrong-password") {
          setErrorText("Incorrect password");
          setPasswordError("error");
        } else if (error.code === "auth/internal-error") {
          setErrorText("No password provided");
          setPasswordError("error");
        } else {
          setToast({
            text: error.code + " " + error.message,
            type: "error",
            delay: 5000,
          });
        }
        setLogInIcon(<CheckIcon size={24} />);
      });
  };
  return (
    <div>
      <Meta
        title="Celer | Log In"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        <div className="w-full mt-[256px] h-[420px]">
          <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
            LOG IN
          </div>
          <div className="text-xl font-semibold tracking-tighter text-center">
            Welcome back.
          </div>
          <div className="mt-20 flex justify-center items-center">
            <div className="max-w-[320px]">
              <form onSubmit={loginUser}>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Username"
                    width="275px"
                    onChange={onUsernameChange}
                    value={username}
                    type={usernameError}
                  ></Input>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Input.Password
                    placeholder="Password"
                    width="275px"
                    onChange={onPasswordChange}
                    value={password}
                    type={passwordError}
                  ></Input.Password>
                </div>
                <input type="submit" hidden onSubmit={loginUser} />
              </form>
              <div className="flex">
                <div className="text-error-300 text-xs mt-2">
                  {errorText == "" ? <div>&nbsp;</div> : errorText}
                </div>
              </div>
              <div className="w-full flex justify-center mt-20">
                <button
                  type="submit"
                  onClick={loginUser}
                  className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center"
                >
                  {logInIcon}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-sm mt-10">
          <Link href="/signup" underline color>
            I don&apos;t have an account. Take me to the sign up page!
          </Link>
        </div>
      </Body>
    </div>
  );
}
