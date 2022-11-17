import * as React from "react";

import { Header, Body } from "@components/web";
import { Input, useToasts, Link } from "@geist-ui/core";
import { app } from "@lib/firebase";
import { CheckIcon } from "@primer/octicons-react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const { setToast } = useToasts();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  const loginUser = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username + "@celer.vercel.app", password)
      .then((userCredential) => {
        // Signed in
        setToast({
          text: "Logged In!",
          type: "success",
          delay: 5000,
        });
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
        } else {
          setToast({
            text: error.code + " " + error.message,
            type: "error",
            delay: 5000,
          });
        }
      });
  };
  return (
    <div>
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
              <div className="flex">
                <div className="text-error-300 text-xs mt-2">
                  {errorText == "" ? <div>&nbsp;</div> : errorText}
                </div>
              </div>
              <div className="w-full flex justify-center mt-20">
                <button
                  type="success"
                  onClick={loginUser}
                  className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center"
                >
                  <CheckIcon size={24} />
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
