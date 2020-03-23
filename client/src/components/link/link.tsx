import React, { ReactElement } from "react";
import { Link as RouterLink } from "@reach/router";

import * as classes from "./link.styles";

type Props = {
  to: string;
  children: ReactElement | string;
};

export const Link = ({ to, children }: Props) => {
  return (
    <RouterLink className={classes.root} to={to}>
      {children}
    </RouterLink>
  );
};
