import React from "react";
import { Header, Meta } from "@components/web";
import { Avatar, Divider } from "@geist-ui/core";
import Image from "next/image";
import Tag from "./Tag";

export default function Layout(props) {
  return (
    <div>
      <Header />
      <Meta
        title={props.meta.title}
        description="🚀 Instantly share beautiful notes, latex, markdown, and more!"
      />
      <div className="md:pt-[256px] pt-[128px] w-full flex justify-center pl-4 pr-4">
        <article className="max-w-[900px] prose lg:prose-lg xl:prose-xl prose-black dark:prose-invert grow">
          <div className="flex flex-wrap gap-2">
            {props.meta.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <div className="md:text-6xl font-semibold tracking-tighter mt-4 xs:text-5xl text-4xl">
            {props.meta.title}
          </div>
          <div className="text-xl text-gray-500 mt-2 mb-2">
            {props.meta.description}
          </div>
          <div className="flex pl-8 pr-8">
            <div className="grow"></div>
            <div className="gap-2 flex flex-wrap">
              {props.meta.contributors.map((contributor) => (
                <a
                  href={`https://github.com/${contributor}`}
                  key={contributor.name}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Image
                    src={`https://github.com/${contributor}.png`}
                    width={32}
                    height={32}
                    key={contributor}
                    scale={24}
                    alt="Contributor Picture"
                    className="rounded-full"
                  />
                </a>
              ))}
            </div>
          </div>
          <Divider />
          {props.children}
          <div className="mt-[200px]"></div>
        </article>
      </div>
    </div>
  );
}
