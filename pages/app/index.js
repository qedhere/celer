import * as React from "react";
import { useUser } from "@components/hooks";
import {
  Button,
  useToasts,
  Loading,
  Select,
  Popover,
  Modal,
} from "@geist-ui/core";
import { useRouter } from "next/router";
import { app } from "@lib/firebase";
import { getAuth, signOut } from "firebase/auth";
import { Header, Body, Meta, DiceAvatar } from "@components/web";
import {
  EyeIcon,
  RepoIcon,
  HeartIcon,
  CommentDiscussionIcon,
  FeedRepoIcon,
  PlusIcon,
  ArrowRightIcon,
  KebabHorizontalIcon,
  ShareIcon,
  TrashIcon,
} from "@primer/octicons-react";
import moment from "moment";
import {
  doc,
  updateDoc,
  getFirestore,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import Image from "next/image";

const db = getFirestore(app);

export default function App() {
  const router = useRouter();
  const { setToast } = useToasts();
  const { user, loading, data } = useUser();
  const [aboutMe, setAboutMe] = React.useState("");
  const [notes, setNotes] = React.useState();
  const [currentSort, setCurrentSort] = React.useState([]);
  const [loadingOpacity, setLoadingOpacity] = React.useState(0);
  const [modal, setModal] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState();
  const [modalLoading, setModalLoading] = React.useState(false);
  const modalHandler = () => {
    setModal(true);
  };
  const closeModalHandler = (event) => {
    setModal(false);
  };

  React.useEffect(() => {
    if (data) {
      setAboutMe(data.aboutMe);
      console.log(data);
    }
    if (user) {
      const fetchNotesData = async () => {
        const posts = await getDocs(
          collection(db, "users", user.email, "notes")
        );

        const unsortedPosts = posts.docs.map((doc) => doc.data());
        const sortedPosts = unsortedPosts.sort((a, b) => {
          return new Date(b.timestamp) - new Date(a.timestamp);
        });
        setNotes(sortedPosts);
      };

      fetchNotesData();
    }
  }, [data, user]);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setToast({
          text: "Logged Out!",
          type: "success",
          delay: 5000,
        });
        router.push("/login");
      })
      .catch((error) => {
        setToast({
          text: error.code + " " + error.message,
          type: "error",
          delay: 5000,
        });
        router.push("/login");
      });
  };

  const updateAboutMe = async () => {
    setLoadingOpacity(0.5);
    const userDataRef = doc(db, "users", user.email);

    await updateDoc(userDataRef, {
      aboutMe: aboutMe,
    });
    setLoadingOpacity(0);
  };

  const deleteNote = async () => {
    setModalLoading(true);
    var updatedTags = data.tags;
    for (var i in selectedNote.tags) {
      console.log(selectedNote.tags[i]);
      // Remove note from tag

      updatedTags[selectedNote.tags[i]].splice(
        updatedTags[selectedNote.tags[i]].indexOf(selectedNote.id),
        1
      );
      if (selectedNote.tags[i] != "Unlisted") {
        if (updatedTags[selectedNote.tags[i]].length === 0) {
          // Remove tag if no notes are left
          delete updatedTags[selectedNote.tags[i]];
        }
      }
    }

    const userDataRef = doc(db, "users", user.email);
    await updateDoc(userDataRef, {
      tags: updatedTags,
    });

    // Remove note from notes list
    await deleteDoc(doc(db, "users", user.email, "notes", selectedNote.id));

    // Reduce note count
    await updateDoc(userDataRef, {
      totalNotes: data.totalNotes - 1,
    });

    setModal(false);
    setModalLoading(false);

    // Show toast with note ID
    setToast({
      text: "Deleted note " + selectedNote.id,
      type: "success",
      delay: 5000,
    });

    // Refresh page
    router.reload();
  };

  const popoverContent = () => (
    <div className="pt-0 pb-0 flex flex-col items-start">
      <button className="text-sm hover:bg-gray-100 pl-2 pr-2 pt-2 pb-2 w-full flex gap-1 items-center duraiton-200">
        <ShareIcon /> Copy Link
      </button>
      <button
        className="text-sm hover:bg-red-100 pl-2 pr-2 pt-2 pb-2 w-full flex gap-1 items-center text-error-300 duration-200"
        onClick={modalHandler}
      >
        <TrashIcon /> Delete Note
      </button>
    </div>
  );

  if (loading)
    return (
      <div>
        <Meta
          title="Celer | App"
          description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
        />
        <Header />
        <Body>
          <div className="w-full mt-[256px]">
            <Loading />
          </div>
        </Body>
      </div>
    );
  else {
    if (!user) {
      return (
        <div>
          <Meta
            title="Celer | App"
            description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
          />
          <Header />
          <Body>
            <div className="w-full mt-[256px]">
              <div className="text-xs font-semibold tracking-widest text-center text-success-300 mb-2">
                ERROR 403
              </div>
              <div className="text-xl font-semibold tracking-tighter text-center">
                You are not logged in.
              </div>
              <div className="flex justify-center mt-20">
                <div className="flex flex-col gap-2">
                  <Button onClick={() => router.push("/login")}>Log In</Button>
                  <Button
                    type="secondary"
                    onClick={() => router.push("/signup")}
                  >
                    Sign up
                  </Button>
                </div>
              </div>
            </div>
          </Body>
        </div>
      );
    } else {
      if (notes) {
        return (
          <div>
            <Meta
              title="Celer | App"
              description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
            />
            <Header />
            <Body>
              <Modal visible={modal} onClose={closeModalHandler}>
                <Modal.Title>Hold up</Modal.Title>
                <Modal.Subtitle>This action cannot be undone</Modal.Subtitle>
                <Modal.Content>
                  <p className="text-center">
                    Are you sure you want to do this?
                  </p>
                </Modal.Content>
                <Modal.Action passive onClick={() => setModal(false)}>
                  Cancel
                </Modal.Action>
                <Modal.Action
                  type="error"
                  style={{ backgroundColor: "#e00e0010" }}
                  onClick={deleteNote}
                  loading={modalLoading}
                >
                  <button className="text-error-300">Delete</button>
                </Modal.Action>
              </Modal>
              <div className="w-full mt-[256px]">
                <div className="flex mb-10 xs:justify-start items-center w-full gap-10 flex-wrap">
                  <div className="w-[90px] h-[90px]">
                    <DiceAvatar user={user.email} size={90} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight">
                      {user.email.slice(0, user.email.indexOf("@"))}
                    </div>
                    <div className="text-sm text-gray-500">
                      Joined{" "}
                      {moment(new Date(user.metadata.creationTime)).fromNow()}
                    </div>
                    <div className="text-sm text-gray-500">
                      Last login{" "}
                      {moment(new Date(user.metadata.lastSignInTime)).fromNow()}
                    </div>
                    <div className="flex items-center gap-5 text-xs text-gray-500 mt-2">
                      <div className="flex items-center gap-2">
                        <RepoIcon /> {data.totalNotes}
                      </div>
                      <div className="flex items-center gap-2">
                        <EyeIcon /> {data.totalViews}
                      </div>
                      <div className="flex items-center gap-2">
                        <HeartIcon /> {data.totalViews}
                      </div>
                      <div className="flex items-center gap-2">
                        <CommentDiscussionIcon /> {data.totalViews}
                      </div>
                    </div>
                  </div>
                  <div className="grow h-full min-w-[200px] flex justify-center sm:max-w-none relative group">
                    <textarea
                      value={aboutMe}
                      onBlur={updateAboutMe}
                      onChange={(e) => setAboutMe(e.target.value)}
                      placeholder="About me (Click to edit)"
                      className="placeholder:text-gray-400 w-full h-[80px] text-sm p-0 m-0 resize-none rounded-lg p-2 focus:ring duration-500 ring-gray-100 overflow-hidden"
                    ></textarea>
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-gray-100 rounded-md pointer-events-none duation-1000"
                      style={{ opacity: loadingOpacity }}
                    >
                      <Loading />
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mb-10">
                  <button
                    onClick={() =>
                      router.push(
                        "/" + user.email.slice(0, user.email.indexOf("@"))
                      )
                    }
                    className="bg-black-900 text-white pl-4 pr-4 pt-1 border border-black-900 pb-1 text-sm rounded-full hover:bg-transparent hover:text-black-900 duration-200"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={logOut}
                    className="bg-[#e00e0020] text-error-200 pl-4 pr-4 pt-1 pb-1 text-sm rounded-full hover:bg-[#e00e0035] duration-200"
                  >
                    Log Out
                  </button>
                </div>
                <div className="mt-20 flex flex-wrap gap-5">
                  <div className="text-2xl flex gap-2 items-center tracking-tighter font-bold">
                    <FeedRepoIcon size={24} className="" />
                    My Notes
                  </div>
                  <div className="grow"></div>
                  <div className="grow w-full pr-4">
                    <Select
                      placeholder="Search..."
                      multiple
                      width="100%"
                      onChange={(val) => {
                        setCurrentSort(val);
                      }}
                    >
                      {Object.keys(data.tags).map((tag) => {
                        return (
                          <Select.Option value={tag} key={tag}>
                            {tag}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>

                {notes.length > 1 ? (
                  <div className="min-h-[300px] w-full flex relative">
                    <div className="mt-5 flex flex-wrap gap-2">
                      {notes.map((note) => {
                        if (note.id != "00000000000") {
                          if (
                            currentSort.every((val) => note.tags.includes(val))
                          ) {
                            return (
                              <div
                                key={note.id}
                                className="p-4 border relative rounded-xl h-fit max-w-[264px] bg-gradient-to-b from-gray-50 to-gray-100 shadow-md hover:shadow-xl duration-500"
                              >
                                <div className="absolute top-0 right-0 pr-4 pt-2">
                                  <button
                                    className="text-gray-400"
                                    onClick={() => {
                                      setSelectedNote(note);
                                    }}
                                  >
                                    <Popover
                                      content={popoverContent}
                                      placement="top"
                                      enterDelay={50}
                                      leaveDelay={0}
                                      disableItemsAutoClose={false}
                                    >
                                      <KebabHorizontalIcon />
                                    </Popover>
                                  </button>
                                </div>
                                <div className="font-mono text-xs text-gray-500">
                                  {note.id}
                                </div>
                                <div className="flex">
                                  <div className="font-bold tracking-tighter text-xl truncate">
                                    {note.title}
                                  </div>
                                  <div className="grow"></div>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {note.tags.map((tag) => (
                                    <div
                                      className="text-[8pt] bg-gray-200 rounded-full pl-2 pr-2 text-gray-500"
                                      key={tag}
                                    >
                                      {tag}
                                    </div>
                                  ))}
                                </div>
                                <div className="text-sm mt-2 text-gray-500 whitespace-wrap truncate h-[50px]">
                                  {note.content}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                  <div className="flex items-center gap-2">
                                    <EyeIcon /> {data.totalViews}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <HeartIcon /> {data.totalViews}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <CommentDiscussionIcon /> {data.totalViews}
                                  </div>
                                  <div className="grow"></div>
                                  <div className="">
                                    <button
                                      className="p-2 rounded-full duration-200 hover:bg-[#0070f320] flex items-center justify-center text-success-300"
                                      onClick={() =>
                                        router.push(
                                          "/" +
                                            user.email.slice(
                                              0,
                                              user.email.indexOf("@")
                                            ) +
                                            "/" +
                                            note.id
                                        )
                                      }
                                    >
                                      <ArrowRightIcon />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        }
                      })}
                    </div>
                    <div className="absolute right-0 bottom-0">
                      <button
                        onClick={() => router.push("/app/new")}
                        className="bg-[transparent] w-[45px] h-[45px] backdrop-blur shadow-xl sm:shadow-none rounded-full flex items-center border border-2 border-dashed border-success-100 justify-center hover:bg-[#0070f320] duration-200 hover:border-solid"
                      >
                        <PlusIcon className="text-success-300" size={24} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[300px] w-full flex flex-col justify-center items-center relative">
                    <div className="w-full flex justify-center">
                      <Image
                        src="/mona-loading.gif"
                        width={75}
                        height={75}
                        alt="Loading GIF"
                        priority
                      />
                    </div>
                    <div className="text-gray-500 text-sm mt-5">
                      You have no notes yet. Create one!
                    </div>
                    <div className="absolute right-0 bottom-0">
                      <button
                        onClick={() => router.push("/app/new")}
                        className="bg-[transparent] w-[45px] h-[45px] rounded-full flex items-center border border-2 border-dashed border-success-100 justify-center hover:bg-[#0070f320] duration-200 hover:border-solid"
                      >
                        <PlusIcon className="text-success-300" size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full h-[200px] "></div>
            </Body>
          </div>
        );
      } else {
        return (
          <div>
            <Meta
              title="Celer | App"
              description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
            />
            <Header />
            <Body>
              <div className="w-full mt-[256px]">
                <Loading />
              </div>
            </Body>
          </div>
        );
      }
    }
  }
}
