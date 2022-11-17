import { Drawer, Divider } from "@geist-ui/core";
import { useWindowSize } from "@react-hook/window-size";
import React from "react";
import HeaderActionList from "./HeaderActionList";
import HeaderGitStatus from "./HeaderGitStatus";
import { useUser } from "@components/hooks";
import { DiceAvatar } from "@components/web";

export default function HeaderDrawer(props) {
  const { user, loading } = useUser();
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

  if (loading || !user)
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
              <div className="h-full flex items-center"></div>
            </div>
            <HeaderActionList />
            <div className="mt-5"></div>
            <HeaderGitStatus />
          </div>
        </Drawer.Content>
      </Drawer>
    );

  if (user)
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
              <div className="font-semibold tracking-tight text-xl flex items-center w-full">
                {user.email.slice(0, user.email.indexOf("@"))}
                <div className="grow"></div>
                <DiceAvatar user={user.email} size={48} />
              </div>
              <div className="grow"></div>
              <div className="h-full flex items-center"></div>
            </div>
            <HeaderActionList />
            <div className="mt-5"></div>
            <HeaderGitStatus />
          </div>
        </Drawer.Content>
      </Drawer>
    );
}
