import React from "react";
import Link from "next/link";

export default function LinkButton(props) {
  return (
    <Link href={props.href} className="no-underline">
      <button className="bg-gray-100 rounded-xl text-gray-500 pl-4 pr-4 pt-2 pb-2 flex gap-2 items-center">
        {props.text}
      </button>
    </Link>
  );
}
