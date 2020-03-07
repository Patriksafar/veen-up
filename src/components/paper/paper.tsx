import React, { ReactNode } from "react";

import * as classes from "./paper.style";

type Props = {
  children: ReactNode;
};
export const Paper = ({ children }: Props) => {
  return <div className={classes.root}>{children}</div>;
};
