import React, { ReactNode } from "react";

import * as classes from "./container.style";
import { cx } from "emotion";
type Props = {
  children: ReactNode;
  sidebarOffset?: boolean;
  noPadding?: boolean;
  variant?: "wide" | "compact";
};

export const Container = ({
  children,
  sidebarOffset,
  noPadding,
  variant = "compact"
}: Props) => {
  const containerClasses = cx(classes.root, {
    [classes.sidebarOffset]: sidebarOffset,
    [classes.noPadding]: noPadding,
    [classes.wide]: variant === "wide",
    [classes.compact]: variant === "compact"
  });
  return <div className={containerClasses}>{children}</div>;
};
