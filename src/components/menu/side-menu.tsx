import React, { ReactNode } from "react";

import * as classes from "./menu.style";

type Props = {
  children?: ReactNode;
  endAdornment?: ReactNode;
};

export const SideMenu = ({ children, endAdornment }: Props) => {
  return (
    <div className={classes.root} id="side-menu">
      {children}
      <div className={classes.endAdornment}>{endAdornment}</div>
    </div>
  );
};
