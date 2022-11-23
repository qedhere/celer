import * as React from "react";

import { Header, Body, Meta } from "@components/web";
import { createAvatar } from "@dicebear/avatars";
import { uid } from "uid";
import * as style from "@dicebear/micah";
import Image from "next/image";
import { Input, useToasts, Link, Loading } from "@geist-ui/core";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  SearchIcon,
  CheckIcon,
} from "@primer/octicons-react";
import { TbRefresh } from "react-icons/tb";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";
import { app } from "@lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

const db = getFirestore(app);

export default function SignUp() {
  const router = useRouter();
  const { setToast } = useToasts();
  const [seed, setSeed] = React.useState(uid());
  const [currentPage, setCurrentPage] = React.useState(0);
  const [buttonStatus, setButtonStatus] = React.useState([0, 0]);
  const [formErrors, setFormErrors] = React.useState([true, true, true]);
  const [userNameInputValue, setUserNameInputValue] = React.useState("");
  const [userNameError, setUserNameError] = React.useState("");
  const [userNameErrorText, setUserNameErrorText] = React.useState("");
  const [userNameSuccessText, setUserNameSuccessText] = React.useState("");
  const [passwordOneValue, setPasswordOneValue] = React.useState("");
  const [passwordOneError, setPasswordOneError] = React.useState("");
  const [passwordOneErrorText, setPasswordOneErrorText] = React.useState("");
  const [passwordTwoValue, setPasswordTwoValue] = React.useState("");
  const [passwordTwoError, setPasswordTwoError] = React.useState("");
  const [passwordTwoErrorText, setPasswordTwoErrorText] = React.useState("");
  const [searchIcon, setSearchIcon] = React.useState(<SearchIcon size={24} />);
  const [finishIcon, setFinishIcon] = React.useState(<CheckIcon size={24} />);
  const [svg, setSvg] = React.useState(null);

  React.useEffect(() => {
    setSvg(
      createAvatar(style, {
        seed: seed,
        dataUri: true,
      })
    );
  }, [seed]);

  React.useEffect(() => {
    if (currentPage === 0) {
      if (formErrors[0] === false) {
        setButtonStatus([0, 1]);
      } else {
        setButtonStatus([0, 0]);
      }
    } else if (currentPage === 1) {
      if (formErrors[1] === false) {
        setButtonStatus([1, 1]);
      } else {
        setButtonStatus([1, 0]);
      }
    } else if (currentPage === 2) {
      if (formErrors[2] === false) {
        setButtonStatus([1, 1]);
      } else {
        setButtonStatus([1, 0]);
      }
    }
  }, [currentPage, formErrors]);

  const incrementPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const decrementPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const checkValidUsername = async (e) => {
    e.preventDefault();
    if (userNameInputValue.length < 3) {
      setUserNameError("error");
      setUserNameErrorText("Username must be at least 3 characters long.");
    } else {
      // Check regex pattern
      if (userNameInputValue.match(/^[a-z0-9]+$/)) {
        setSearchIcon(<Loading type="success" />);
        const querySnapshot = await getDocs(collection(db, "users"));
        var docIdList = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docIdList.push(doc.id.slice(0, -17));
        });
        setSearchIcon(<SearchIcon size={24} />);

        if (docIdList.includes(userNameInputValue)) {
          setUserNameError("error");
          setUserNameErrorText("Username already exists.");
        } else {
          setUserNameError("success");
          setUserNameErrorText("");
          setUserNameSuccessText("That looks unique to me :)");
          setFormErrors([formErrors[0], false, formErrors[2]]);
        }
      } else {
        setUserNameError("error");
        setUserNameErrorText(
          "Username can only contain lowercase letters and numbers."
        );
      }
    }
  };

  const checkValidPassword = async (e) => {
    e.preventDefault();
    if (passwordOneValue.length < 6 || passwordTwoValue.length < 6) {
      setPasswordOneError("error");
      setPasswordOneErrorText("Password must be at least 6 characters long.");
      setPasswordTwoError("error");
      setPasswordTwoErrorText("Password must be at least 6 characters long.");
    } else {
      if (passwordOneValue === passwordTwoValue) {
        setPasswordOneError("success");
        setPasswordOneErrorText("");
        setPasswordTwoError("success");
        setPasswordTwoErrorText("");

        const auth = getAuth();
        setFinishIcon(<Loading type="success" />);
        createUserWithEmailAndPassword(
          auth,
          userNameInputValue + "@celer.vercel.app",
          passwordOneValue
        )
          .then(async (userCredential) => {
            // Signed in
            const user = userCredential.user;

            setToast({
              text: "Setting up your account...",
              type: "success",
              delay: 5000,
            });

            await setDoc(
              doc(db, "users", userNameInputValue + "@celer.vercel.app"),
              {
                pictureSeed: seed,
                totalViews: 0,
                totalLikes: 0,
                totalComments: 0,
                totalNotes: 0,
                aboutMe: "",
                joinedDate: new Date().toString(),
                lastLogin: new Date().toString(),
                tags: {
                  "Unlisted" : [],
                }
              }
            );

            await setDoc(
              doc(
                db,
                "users",
                userNameInputValue + "@celer.vercel.app",
                "notes",
                "default"
              ),
              {
                title: "Welcome to Celer!",
                content: "This is note has been auto-generated.",
                likes: 0,
                views: 0,
              }
            );

            setToast({
              text: "Logged In!",
              type: "success",
              delay: 5000,
            });

            setFinishIcon(<CheckIcon size={24} />);

            router.push("/app");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setToast({
              text: errorCode + " " + errorMessage,
              delay: 5000,
              type: "error",
            });
            // ..
          });
      } else {
        setPasswordOneError("error");
        setPasswordOneErrorText("Passwords do not match.");
        setPasswordTwoError("error");
        setPasswordTwoErrorText("Passwords do not match.");
      }
    }
  };

  const handleUsernameInputChange = (e) => {
    setUserNameError("");
    setUserNameErrorText("");
    setUserNameSuccessText("");
    if (e.target.value.length < 17) {
      setUserNameInputValue(e.target.value);
    }
  };

  const handlePasswordOneChange = (e) => {
    setPasswordOneError("");
    setPasswordOneErrorText("");
    if (e.target.value.length < 33) {
      setPasswordOneValue(e.target.value);
    }
  };

  const handlePasswordTwoChange = (e) => {
    setPasswordTwoError("");
    setPasswordTwoErrorText("");
    if (e.target.value.length < 33) {
      setPasswordTwoValue(e.target.value);
    }
  };

  return (
    <div>
      <Meta
        title="Celer | Sign Up"
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <Header />
      <Body>
        {currentPage == 0 ? (
          <div className="w-full mt-[256px] h-[420px]">
            <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
              PICK AN AVATAR
            </div>
            <div className="text-xl font-semibold tracking-tighter text-center">
              Your journey begins here.
            </div>
            <div className="flex justify-center w-full mt-20">
              <div className="rounded-full p-8 flex justify-center items-center">
                {svg ? (
                  <Image src={svg} width={100} height={100} alt="Avatar" />
                ) : null}
              </div>
            </div>
            <div className="w-full flex justify-center mt-20">
              <button
                type="success"
                onClick={() => {
                  setSeed(uid());
                  setFormErrors([false, true, true]);
                }}
                className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center"
              >
                <TbRefresh size={24} />
              </button>
            </div>
          </div>
        ) : currentPage == 1 ? (
          <div className="w-full mt-[256px] h-[420px]">
            <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
              PICK A USERNAME
            </div>
            <div className="text-xl font-semibold tracking-tighter text-center">
              Something that is unique.
            </div>
            <div className="mt-20 flex justify-center items-center">
              <div className="max-w-[320px]">
                <form onSubmit={checkValidUsername}>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="octocat"
                      width="275px"
                      onChange={handleUsernameInputChange}
                      value={userNameInputValue}
                      type={userNameError}
                    ></Input>
                  </div>
                  <input type="submit" hidden onSubmit={checkValidUsername} />
                </form>

                <div className="flex">
                  <div className="text-error-300 text-xs mt-2">
                    {userNameErrorText == "" ? (
                      <div>&nbsp;</div>
                    ) : (
                      userNameErrorText
                    )}
                  </div>
                  <div className="text-success-300 text-xs mt-2">
                    {userNameSuccessText}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mt-20">
              <button
                type="success"
                onClick={checkValidUsername}
                className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center"
              >
                {searchIcon}
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full mt-[256px] h-[420px]">
            <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
              YOUR PASSWORD
            </div>
            <div className="text-xl font-semibold tracking-tighter text-center">
              Which should be a secret.
            </div>
            <div className="mt-20 flex justify-center items-center">
              <form onSubmit={checkValidPassword}>
                <div className="max-w-[320px]">
                  <div className="flex items-center gap-2">
                    <Input.Password
                      placeholder="Your password"
                      width="275px"
                      onChange={handlePasswordOneChange}
                      value={passwordOneValue}
                      type={passwordOneError}
                    ></Input.Password>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Input.Password
                      placeholder="Confirm password"
                      width="275px"
                      onChange={handlePasswordTwoChange}
                      value={passwordTwoValue}
                      type={passwordTwoError}
                    ></Input.Password>
                  </div>
                  <div className="flex">
                    <div className="text-error-300 text-xs mt-2">
                      {passwordTwoErrorText == "" ? (
                        <div>&nbsp;</div>
                      ) : (
                        passwordTwoErrorText
                      )}
                    </div>
                  </div>
                </div>
                <input type="submit" hidden onSubmit={checkValidPassword} />
              </form>
            </div>
            <div className="w-full flex justify-center mt-20">
              <button
                type="success"
                onClick={checkValidPassword}
                className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center"
              >
                {finishIcon}
              </button>
            </div>
          </div>
        )}
        <div>
          <div className="flex justify-center mt-10">
            {buttonStatus[0] == 1 ? (
              <button
                onClick={decrementPage}
                className="text-success-400 hover:bg-[#0070f320] duration-200 w-[40px] h-[40px] flex justify-center items-center rounded-full"
              >
                <ArrowLeftIcon size={24} />
              </button>
            ) : (
              <button
                className="text-gray-400 w-[40px] h-[40px] flex justify-center items-center rounded-full"
                disabled
              >
                <ArrowLeftIcon size={24} />
              </button>
            )}

            <div className="grow max-w-[200px]"></div>

            {buttonStatus[1] == 1 ? (
              <button
                onClick={incrementPage}
                className="text-success-400 hover:bg-[#0070f320] duration-200 w-[40px] h-[40px] flex justify-center items-center rounded-full"
              >
                <ArrowRightIcon size={24} />
              </button>
            ) : (
              <button
                className="text-gray-400 w-[40px] h-[40px] flex justify-center items-center rounded-full"
                disabled
              >
                <ArrowRightIcon size={24} />
              </button>
            )}
          </div>
          <div className="text-center text-sm mt-10">
            <Link href="/login" underline color>
              I already have an account. Take me to the log in page!
            </Link>
          </div>
        </div>
      </Body>
    </div>
  );
}
