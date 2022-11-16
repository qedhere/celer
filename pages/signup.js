import * as React from "react";

import { Header, Body } from "@components/web";
import { useUser } from "@components/hooks";
import { createAvatar } from "@dicebear/avatars";
import { uid } from "uid";
import * as style from "@dicebear/micah";
import Image from "next/image";
import { Input, useToasts } from "@geist-ui/core";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  SearchIcon,
  CheckIcon,
} from "@primer/octicons-react";
import { TbRefresh } from "react-icons/tb";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "@lib/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const db = getFirestore(app);

export default function SignUp() {
  const { user, loading } = useUser();
  const { setToast } = useToasts()
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

  const checkValidUsername = async () => {
    if (userNameInputValue.length < 3) {
      setUserNameError("error");
      setUserNameErrorText("Username must be at least 3 characters long.");
    } else {
      // Check regex pattern
      if (userNameInputValue.match(/^[a-zA-Z0-9]+$/)) {
        const querySnapshot = await getDocs(collection(db, "users"));
        var docIdList = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          docIdList.push(doc.id.slice(0, -17));
        });

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
        setUserNameErrorText("Username can only contain letters and numbers.");
      }
    }
  };

  const checkValidPassword = async () => {
    if (passwordOneValue.length < 8 || passwordTwoValue.length < 8) {
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

        createUserWithEmailAndPassword(auth, userNameInputValue + "@celer.vercel.app", passwordOneValue)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('okay')
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            setToast({ text: errorCode + ' ' + errorMessage, delay: 5000, type: 'error' })
            // ..
          });
      } else {
        setPasswordOneError("error");
        setPasswordOneErrorText("Passwords do not match.");
        setPasswordTwoError("error");
        setPasswordTwoErrorText("Passwords do not match.");
      }
    }
  }

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
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="octocat"
                    width="275px"
                    onChange={handleUsernameInputChange}
                    value={userNameInputValue}
                    type={userNameError}
                  ></Input>
                </div>
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
                <SearchIcon size={24} />
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
            </div>
            <div className="w-full flex justify-center mt-20">
              <button
                type="success"
                onClick={checkValidPassword}
                className="bg-[#0070f320] hover:bg-[#0070f340] duration-200 rounded-full text-success-300 w-[40px] h-[40px] flex justify-center items-center"
              >
                <CheckIcon size={24} />
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
        </div>
      </Body>
    </div>
  );
}
