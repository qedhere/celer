import React from "react";
import { Header } from "@components/web";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <div className="md:pt-[256px] pt-[128px] w-full flex justify-center pl-4 pr-4">
        <article className="max-w-[1000px] prose lg:prose-lg prose-black dark:prose-invert grow">
          {props.children}
          <div className="mt-[200px]"></div>
        </article>
      </div>
    </div>
  );
}
