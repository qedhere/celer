import React from "react";
import Link from "next/link";

export default function HeaderActionListButton(props) {
  if (props.public) {
    return (
      <a
        href={props.href}
        rel="noopener noreferrer"
        target="_blank"
        style={{ color: "inherit" }}
      >
        <button className="flex justify-center gap-1 items-center pt-2 pb-2 pl-4 pr-4 rounded-md duration-200 text-sm w-fit bg-neutral-100 hover:bg-neutral-200 text-neutral-600 ">
          <div>{props.icon}</div>
          <div className="grow"></div>
          <div>{props.children}</div>
        </button>
      </a>
    );
  } else {
    return (
      <Link href={props.href} passHref style={{ color: "inherit" }}>
        <button className="flex justify-center gap-1 items-center pt-2 pb-2 pl-4 pr-4 rounded-md duration-200 text-sm w-fit bg-neutral-100 hover:bg-neutral-200 text-neutral-600 ">
          <div>{props.icon}</div>
          <div className="grow"></div>
          <div>{props.children}</div>
        </button>
      </Link>
    );
  }
}
