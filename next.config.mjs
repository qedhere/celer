import nextMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkPrism from "remark-prism";

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkPrism],
    rehypePlugins: [rehypeKatex],
  },
});

export default withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  images: {
    domains: ["github.com", "avatars.githubusercontent.com"],
  },
});
