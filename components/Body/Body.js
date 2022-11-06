import React from "react";

export default function Body(props) {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[1000px] grow border pl-4 pr-4">{props.children}</div>
    </div>
  );
}
