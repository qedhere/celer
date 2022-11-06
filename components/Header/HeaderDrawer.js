import { Drawer, Divider } from "@geist-ui/core";

import HeaderIconButton from "./HeaderIconButton";
import { useWindowSize } from "@react-hook/window-size";
import React from "react";
import { HeaderActionList } from "@components/web";
import HeaderGitStatus from "./HeaderGitStatus";

export default function HeaderDrawer(props) {
  const [width, height] = useWindowSize();
  const [placement, setPlacement] = React.useState("right");
  const [drawerStyle, setDrawerStyle] = React.useState({
    width: "300px",
    borderRadius: "0px",
    display: "flex",
  });

  React.useEffect(() => {
    if (width < 600) {
      setPlacement("bottom");
      setDrawerStyle({
        width: "100%",
        borderRadius: "auto",
        display: "flex",
      });
    } else {
      setPlacement("right");
      setDrawerStyle({
        width: "320px",
        borderRadius: "0px",
        display: "flex",
      });
    }
  }, [width]);

  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      placement={placement}
      style={drawerStyle}
    >
      <Drawer.Content>
        <div className="flex flex-col h-full w-full">
          <div className="flex items-center">
            <div className="font-semibold tracking-tight text-xl">
              Quick Links
            </div>
            <div className="grow"></div>
            <div className="h-full flex items-center">
              <HeaderIconButton icon={props.icon} onClick={props.changeTheme} />
            </div>
          </div>
          <HeaderActionList />
          <div className="mt-5"></div>
          <HeaderGitStatus />
        </div>
      </Drawer.Content>
    </Drawer>
  );
}
