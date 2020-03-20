import React, { ReactNode } from "react";

import * as classes from "./paper.style";
import { cx } from "emotion";

type Props = {
  children: ReactNode;
  background?: "white" | "transparent";
};
export const Paper = ({ children, background }: Props) => {
  const classesName = cx(classes.root, {
    [classes.whiteBg]: background === "white"
  });
  return <div className={classesName}>{children}</div>;
};
