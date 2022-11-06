import HeaderLink from "./HeaderLink";

export default function HeaderLinkList() {
  return (
    <div className="flex items-center justify-center gap-10">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/app">Dashboard</HeaderLink>
      <HeaderLink href="/docs">Documentation</HeaderLink>
      <HeaderLink href="/contact">Contact</HeaderLink>
    </div>
  );
}
