import React from "react";
import logo from "./veenup-logo.svg";

import * as classes from "./logo.styles";

type Props = {
  variant?: "small" | "medium";
};
export const Logo = ({ variant }: Props) => {
  return <img src={logo} className={classes.root} />;
};
