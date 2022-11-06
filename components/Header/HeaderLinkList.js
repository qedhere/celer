import HeaderLink from "./HeaderLink";

export default function HeaderLinkList() {
  return (
    <div className="flex items-center justify-center gap-10">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/projects">Projects</HeaderLink>
      <HeaderLink href="/blog">Blog</HeaderLink>
      <HeaderLink href="/notes">Notes</HeaderLink>
      <HeaderLink href="/contact">Contact</HeaderLink>
    </div>
  );
}
