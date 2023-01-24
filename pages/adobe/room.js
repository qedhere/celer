import { Meta } from "@components/web";
import { QuestionIcon, SignOutIcon, PlusIcon } from "@primer/octicons-react";
import * as React from "react";
import { FaTelegramPlane } from "react-icons/fa";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import ReactMarkdown from "react-markdown";
import { mhchemParser } from "mhchemparser";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import moment from "moment";
import Image from "next/image";
import { Modal, useToasts } from "@geist-ui/core";
import { SiAdobecreativecloud } from "react-icons/si";

const db = getDatabase(app);

export default function Room() {
  const router = useRouter();
  const [sendButtonDisabled, setSendButtonDisabled] =
    React.useState("grayscale");
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    React.useState("grayscale");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [userName, setUserName] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [userNameValue, setUserNameValue] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const { setToast } = useToasts();
  const [zoom, setZoom] = React.useState(0.8);

  React.useEffect(() => {
    if (db) {
      onValue(ref(db, "room/messages"), (snapshot) => {
        const data = snapshot.val();
        // Map the keys of the data object to an array
        const keys = Object.keys(data);
        // Map the values of the data object to an array
        const values = Object.values(data);

        // Map the keys and values to an array of objects
        const mapped = keys.map((key, index) => {
          return { key, value: values[index] };
        });

        // Find index of DEFAULT_ID in mapped
        const index = mapped.findIndex((obj) => obj.key === "DEFAULT_ID");
        // Remove the object with the DEFAULT_ID
        mapped.splice(index, 1);

        // Sort the array of objects by timestamp
        mapped.sort((a, b) => {
          return a.value.timestamp - b.value.timestamp;
        });
        // Set the messages state to the sorted array of objects
        setMessages(mapped);
      });
    }
  }, []);

  React.useEffect(() => {
    if (db && document.getElementById("msgEnd")) {
      onValue(ref(db, "room/messages"), (snapshot) => {
        const data = snapshot.val();
        try {
          document
            .getElementById("msgEnd")
            .scrollIntoView({ behavior: "smooth" });
        } catch {}
      });
    }
  });

  const parseMhChem = (text) => {
    const regex = /\\ce\{([^}]+)\}/g;
    const matches = text.match(regex);

    // For each match add a space to the start and end

    if (!matches) {
      return text;
    } else {
      matches.forEach((match) => {
        text = text.replace(match, ` ${match} `);
      });
    }

    if (matches) {
      matches.forEach((match) => {
        const parsed = mhchemParser.toTex(match);
        text = text.replace(match, parsed);
      });
    }

    return text;
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (userNameValue.length > 0) {
      if (userNameValue.replace(/\s/g, "").length) {
        // Maximum length of username is 20
        if (userNameValue.length > 20) {
          setSubmitButtonDisabled("grayscale");
        } else {
          setSubmitButtonDisabled("");
          setUserName(userNameValue);
          // Create a user ID
          setUserID(Math.random().toString(36).substring(7));
        }
      }
    }
  };

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    // Get element by ID 'message-input' and set value to empty string
    document.getElementById("message-input").value = "";

    // setTimeout(() => {}, 1000);
    // document.getElementById('msgEnd').scrollIntoView({ behavior: 'smooth'})

    // Check if message is blank
    if (message.replace(/\s/g, "").length) {
      const newMessageRef = ref(
        db,
        "room/messages/" + Math.random().toString(36).substring(7)
      );
      await set(newMessageRef, {
        message: message,
        user: userName,
        timestamp: new Date().getTime().toString(),
        userID: userID,
      });
    } else {
    }
  };

  if (!userName) {
    return (
      <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center">
        <Meta
          title="Celer | Room"
          description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
        />
        <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
          JOIN ROOM
        </div>
        <div className="text-xl font-semibold tracking-tighter text-center">
          Enter your name
        </div>
        <div className="mt-20">
          <div className="flex items-center">
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                onChange={(e) => {
                  setUserNameValue(e.target.value);
                  if (e.target.value.length > 0) {
                    if (e.target.value.replace(/\s/g, "").length) {
                      if (e.target.value.length > 20) {
                        setSubmitButtonDisabled("grayscale");
                      } else {
                        setSubmitButtonDisabled("");
                      }
                    } else {
                      setSubmitButtonDisabled("grayscale");
                    }
                  } else {
                    setSubmitButtonDisabled("grayscale");
                  }
                }}
                className="bg-gray-50 ml-4 mr-4 pt-2 pb-2 text-xs pl-4 pr-4 focus:border-gray-400 duration-200 rounded-full border grow placeholder:italic"
                placeholder="Your name"
              ></input>
            </form>
            <div className="mr-4">
              <button
                type="submit"
                onClick={handleUsernameSubmit}
                disabled={submitButtonDisabled === "grayscale" ? true : false}
                className={`duration-200 text-white-300 bg-success-300 rounded-full w-[30px] h-[30px] text-white flex items-center justify-center hover:bg-success-400 ${submitButtonDisabled}`}
              >
                <SignOutIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Meta
          title="Celer | Room"
          description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
        />
        <Modal visible={modal} onClose={() => setModal(false)}>
          <p className="text-sm text-left mt-5 text-gray-500">
            A low-latency chat room for Adobe Connect users. Share stunning
            notes, LaTeX, Markdown, and more! For more information, visit{" "}
            <button
              href="https://celer.vercel.app"
              className="text-blue-500 hover:underline"
              onClick={() => {
                window.open("https://celer.vercel.app/adobe", "_blank");
              }}
            >
              celer.vercel.app/adobe
            </button>
            .
          </p>
        </Modal>
        <div className="w-full fixed top-0 h-[48px] bg-gradient-to-r from-gray-50 to-transparent flex items-center">
          <Image
            src="/delta.svg"
            width={18}
            height={18}
            className="ml-4 opacity-50"
            alt="Celer"
          />
          <div className="ml-2 text-sm font-extrabold tracking-tighter opacity-50">
            Celer for Adobe
          </div>
          <div className="grow"></div>
          <button
            className="mr-4 text-gray-400 hover:text-gray-500 duration-200"
            onClick={() => setModal(true)}
          >
            <QuestionIcon size={20} />
          </button>
          <div className="w-full absolute bottom-0 h-[1px] bg-gradient-to-r from-gray-200 to-transparent"></div>
        </div>
        <div
          className="fixed w-full h-[calc(100vh-103px)] overflow-y-scroll bg-white flex flex-col top-[48px]"
          id="msgContainer"
        >
          {messages.map((msg) => {
            if (msg.value.userID != userID) {
              return (
                <div className="" key={msg.key} id={msg.key}>
                  <div className="text-xs text-gray-500 mt-4 ml-4 mr-4 flex items-center gap-2">
                    <div className="font-bold">{msg.value.user}</div>

                    <div>
                      {moment(
                        new Date(parseInt(msg.value.timestamp))
                      ).fromNow()}
                    </div>
                  </div>
                  <div className="bg-gray-200 w-fit ml-4 rounded-xl mt-2">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      className="text-sm ml-4 mr-4 pt-[1px] pb-[1px]"
                    >
                      {msg.value.message}
                    </ReactMarkdown>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex" key={msg.key}>
                  <div className="grow"></div>
                  <div className="">
                    <div className="text-xs text-success-200 mt-4 ml-4 mr-4 flex items-center gap-2">
                      <div className="grow"></div>
                      <div>
                        {moment(
                          new Date(parseInt(msg.value.timestamp))
                        ).fromNow()}
                      </div>
                      <div className="font-bold">{msg.value.user}</div>
                    </div>
                    <div className="bg-[#0070f320] w-fit rounded-xl mt-2 float-right mr-4">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        className="text-sm text-black-900 ml-4 mr-4 pt-[1px] pb-[1px]"
                      >
                        {msg.value.message}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              );
            }
          })}
          <div className="w-full pt-2 pb-2" id="msgEnd"></div>
        </div>
        <div className="flex fixed bottom-5 w-[calc(100vw)] items-center">
          <form className="grow flex" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              id="message-input"
              autoComplete="off"
              onChange={(e) => {
                setMessage(parseMhChem(e.target.value));
                if (e.target.value.length > 0) {
                  if (e.target.value.replace(/\s/g, "").length) {
                    setSendButtonDisabled("");
                  } else {
                    setSendButtonDisabled("grayscale");
                  }
                } else {
                  setSendButtonDisabled("grayscale");
                }
              }}
              className="bg-gray-50 ml-4 mr-4 pt-2 pb-2 text-xs pl-4 pr-4 focus:border-gray-400 duration-200 rounded-full border grow placeholder:italic"
              placeholder="Type here"
            ></input>
          </form>
          <div className="mr-4">
            <button
              type="submit"
              onSubmit={handleMessageSubmit}
              disabled={submitButtonDisabled === "grayscale" ? true : false}
              className={`duration-200 text-white-300 bg-success-300 rounded-full w-[30px] h-[30px] text-white flex items-center justify-center hover:bg-success-400 ${sendButtonDisabled}`}
            >
              <FaTelegramPlane />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
