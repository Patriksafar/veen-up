import React, { ReactNode } from "react";

import * as classes from "./layout.style";
import { cx } from "emotion";
type Props = {
  children: ReactNode;
  color?: "transparent" | "contained";
  variant?: "screen" | "container";
};

export const Layout = ({ children, color, variant }: Props) => {
  const rootClasses = cx(classes.root, {
    [classes.blackBackground]: color === "contained",
    [classes.screeen]: variant === "screen",
    [classes.container]: variant === "container"
  });

  return (
    <div className={rootClasses} id="layout">
      {children}
    </div>
  );
};
