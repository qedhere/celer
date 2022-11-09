import React from "react";
import { Header } from "@components/web";
import { Divider } from "@geist-ui/core";
import Tag from "./Tag"

export default function Layout(props) {
  return (
    <div>
      <Header />
      <div className="md:pt-[256px] pt-[128px] w-full flex justify-center pl-4 pr-4">
        <article className="max-w-[1000px] prose lg:prose-lg prose-black dark:prose-invert grow">
          <div className="flex flex-wrap gap-2">
            {props.meta.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="md:text-6xl font-semibold tracking-tighter mt-4 xs:text-5xl text-4xl">{props.meta.title}</div>
          <div className="text-xl text-gray-500 mt-2 mb-5">{props.meta.description}</div>
          <Divider/>
          {props.children}
          <div className="mt-[200px]"></div>
        </article>
      </div>
    </div>
  );
}
