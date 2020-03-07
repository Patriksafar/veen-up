import React, { ReactNode } from "react";

import * as classes from "./layout.style";
type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className={classes.root} id="layout">
      {children}
    </div>
  );
};
