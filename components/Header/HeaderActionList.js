import {
  CommentDiscussionIcon,
  HomeIcon,
  IssueOpenedIcon,
  MarkGithubIcon,
  RepoIcon,
  TasklistIcon,
  PlusIcon,
  SignInIcon,
  SignOutIcon,
} from "@primer/octicons-react";
import * as React from "react";
import HeaderActionListButton from "./HeaderActionListButton";
import HeaderGitStatus from "./HeaderGitStatus";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useToasts } from "@geist-ui/core";

export default function HeaderActionList(props) {
  const router = useRouter();
  const { setToast } = useToasts();
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
  if (!props.loggedIn) {
    return (
      <div>
        <div className="flex flex-wrap gap-2 w-full mt-5">
          <HeaderActionListButton href="/" icon={<HomeIcon />}>
            Home
          </HeaderActionListButton>
          <HeaderActionListButton href="/docs" icon={<RepoIcon />}>
            Documentation
          </HeaderActionListButton>
          <HeaderActionListButton
            href="/contact"
            icon={<CommentDiscussionIcon />}
          >
            Contact
          </HeaderActionListButton>
          <HeaderActionListButton href="/app" icon={<TasklistIcon />}>
            Dashboard
          </HeaderActionListButton>
          <HeaderActionListButton
            href="https://github.com/qedhere/celer/issues/new/choose"
            public
            icon={<IssueOpenedIcon />}
          >
            Issues
          </HeaderActionListButton>
          <HeaderActionListButton
            href="https://github.com/qedhere/celer"
            public
            icon={<MarkGithubIcon />}
          >
            Source Code
          </HeaderActionListButton>
          <HeaderActionListButton href="/signup" public icon={<PlusIcon />}>
            Sign Up
          </HeaderActionListButton>
          <HeaderActionListButton href="/login" icon={<SignInIcon />}>
            Log in
          </HeaderActionListButton>
        </div>
        <div className="mt-5"></div>
        <HeaderGitStatus />
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-wrap gap-2 w-full mt-5">
          <HeaderActionListButton href="/" icon={<HomeIcon />}>
            Home
          </HeaderActionListButton>
          <HeaderActionListButton href="/docs" icon={<RepoIcon />}>
            Documentation
          </HeaderActionListButton>
          <HeaderActionListButton
            href="/contact"
            icon={<CommentDiscussionIcon />}
          >
            Contact
          </HeaderActionListButton>
          <HeaderActionListButton href="/app" icon={<TasklistIcon />}>
            Dashboard
          </HeaderActionListButton>
          <HeaderActionListButton
            href="https://github.com/qedhere/celer/issues/new/choose"
            public
            icon={<IssueOpenedIcon />}
          >
            Issues
          </HeaderActionListButton>
          <HeaderActionListButton
            href="https://github.com/qedhere/celer"
            public
            icon={<MarkGithubIcon />}
          >
            Source Code
          </HeaderActionListButton>
          <HeaderActionListButton
            icon={<SignOutIcon />}
            button
            onClick={logOut}
          >
            Log Out
          </HeaderActionListButton>
        </div>
        <div className="mt-5"></div>
        <HeaderGitStatus />
      </div>
    );
  }
}
