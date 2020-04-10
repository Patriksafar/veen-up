import React, { ReactNode } from "react";

import * as classes from "./box.style";

type Props = {
  children?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
};

export const Box = ({ children, startAdornment, endAdornment }: Props) => {
  return (
    <div className={classes.root}>
      <div className={classes.startAdornment}>{startAdornment}</div>
      <div className={classes.content}>{children}</div>
      <div className={classes.endAdornment}>{endAdornment}</div>
    </div>
  );
};
