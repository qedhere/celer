import * as React from "react";
import Image from "next/image";

import HeaderIconButton from "./HeaderIconButton";
import HeaderLinkList from "./HeaderLinkList";
import HeaderDrawer from "./HeaderDrawer";

import { SunIcon, MoonIcon, ThreeBarsIcon } from "@primer/octicons-react";
import { useTheme } from "next-themes";

export default function Header(props) {
  const [themeNext, setThemeNext] = React.useState("dark");
  const [themeIcon, setThemeIcon] = React.useState();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => {
    if (
      localStorage.getItem("theme") == undefined ||
      localStorage.getItem("theme") == "dark"
    ) {
      setTheme("dark");
      setThemeIcon(<SunIcon />);
    } else {
      setTheme("light");
      setThemeIcon(<MoonIcon />);
    }
  }, [setTheme, setThemeIcon]);

  const changeTheme = () => {
    if (theme == "dark") {
      localStorage.setItem("theme", "light");
      window.location.reload();
      setTheme("light");
    } else {
      localStorage.setItem("theme", "dark");
      window.location.reload();
      setTheme("dark");
    }
  };

  return (
    <div className="fixed h-[65px] w-full flex justify-center backdrop-blur dark:bg-[rgba(0,0,0,0.75)] bg-[rgba(255,255,255,0.5)]">
      <div className="max-w-[1200px] grow flex flex-col items-center pr-4 z-0 pl-4">
        <div className="flex items-center grow w-full">
          <div className="mt-[3px]">
            <Image
              src="/logo.svg"
              width={32}
              height={32}
              className="no-drag dark:invert"
              alt="Logo"
              priority
            />
          </div>
          {props.section ? (
            <>
              <div className="h-[24px] w-[1px] bg-gray-300 dark:bg-neutral-800 mr-4"></div>
              <div className="text-sm tracking-tight font-semibold bg-clip-text">
                {props.section}
              </div>
            </>
          ) : null}
          <div className="grow"></div>
          <HeaderIconButton
            icon={<ThreeBarsIcon size={20} />}
            onClick={() => setDrawerOpen(true)}
          />
        </div>
        <div className="h-[1px] w-full flex">
          <div className="w-[100px] bg-gradient-to-r from-transparent to-neutral-200 dark:to-neutral-900"></div>
          <div className="grow bg-neutral-200 dark:bg-neutral-900"></div>
          <div className="w-[100px] bg-gradient-to-l from-transparent to-neutral-200 dark:to-neutral-900"></div>
        </div>
      </div>
      <div className="fixed top-0 h-[64px] flex items-center justify-center z-10 gap-2 invisible md:visible">
        <HeaderLinkList />
      </div>
      <HeaderDrawer
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        icon={themeIcon}
        changeTheme={changeTheme}
      />
    </div>
  );
}
