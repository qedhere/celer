import React from "react";

export default function Layout(props) {
  return (
    <article className="prose prose-black lg:prose-lg">
      {props.children}
    </article>
  );
}
