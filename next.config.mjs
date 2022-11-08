/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

const NextConfig = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkPrism, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
})

module.exports = NextConfig({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true
})