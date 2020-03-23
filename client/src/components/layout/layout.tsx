import React, { ReactNode } from "react";

import * as classes from "./layout.style";
import { cx } from "emotion";
type Props = {
  children: ReactNode;
  color?: "transparent" | "contained";
};

export const Layout = ({ children, color }: Props) => {
  const rootClasses = cx(classes.root, {
    [classes.blackBackground]: color === "contained"
  });

  return (
    <div className={rootClasses} id="layout">
      {children}
    </div>
  );
};
