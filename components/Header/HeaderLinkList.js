import HeaderLink from "./HeaderLink";
import { Badge } from "@geist-ui/core";

export default function HeaderLinkList() {
  return (
    <div className="flex items-center justify-center gap-10">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/app">Dashboard</HeaderLink>
      <HeaderLink href="/adobe">
        <Badge.Anchor>
          <Badge scale={0.5} type="success">
            NEW
          </Badge>
          Adobe
        </Badge.Anchor>
      </HeaderLink>
      <HeaderLink href="/docs">Documentation</HeaderLink>
    </div>
  );
}
