import {
  CommentDiscussionIcon,
  HomeIcon,
  IssueOpenedIcon,
  MarkGithubIcon,
  NoteIcon,
  RepoIcon,
  TasklistIcon,
} from "@primer/octicons-react";
import React from "react";
import { SlGraph } from "react-icons/sl";
import HeaderActionListButton from "./HeaderActionListButton";

export default function HeaderActionList() {
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
        <HeaderActionListButton href="/blog" icon={<TasklistIcon />}>
          Blog
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
      </div>
    </div>
  );
}
