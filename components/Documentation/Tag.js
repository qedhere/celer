import React from "react";

export default function Tag(props) {
  return (
    <div className="rounded-full bg-[#0070f320] pl-4 pr-4 pt-1 pb-1 w-fit text-sm text-success-300">
      {props.children}
    </div>
  );
}
