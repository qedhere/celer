import React from "react";

export default function Body(props) {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[900px] grow pl-4 pr-4 sm:pl-8 sm:pl-8">
        {props.children}
      </div>
    </div>
  );
}
