import React, { ReactNode } from "react";

import * as classes from "./paper.style";
import { cx } from "emotion";

type Props = {
  children: ReactNode;
  background?: "white" | "transparent";
  smallerPadding?: boolean;
};
export const Paper = ({ children, background, smallerPadding }: Props) => {
  const classesName = cx(classes.root, {
    [classes.whiteBg]: background === "white",
    [classes.smallerPadding]: smallerPadding
  });
  return <div className={classesName}>{children}</div>;
};
