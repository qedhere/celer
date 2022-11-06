import { Loading } from "@geist-ui/core";
import { GitBranchIcon, VersionsIcon } from "@primer/octicons-react";
import * as React from "react";

export default function HeaderGitStatus() {
  const [gitStatus, setGitStatus] = React.useState(null);

  React.useEffect(() => {
    fetch(
      "https://api.github.com/repos/qedhere/celer/branches/main"
    )
      .then((res) => res.json())
      .then((data) => {
        setGitStatus(data);
      });
  });
  if (gitStatus) {
    return (
      <div>
        <div className="flex justify-center items-center mt-5 gap-2">
          <GitBranchIcon />
          <div className="font-mono text-sm">{gitStatus.name}</div>
          <div className="grow"></div>
          <VersionsIcon />
          <div className="font-mono text-sm">
            {gitStatus.commit.sha.substr(0, 8)}
          </div>
        </div>
        <div className="text-sm truncate mt-2 dark:text-black-500 text-gray-500">
          {gitStatus.commit.commit.message}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}
