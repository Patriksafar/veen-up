import React, { ReactElement } from "react";

import * as classes from "./button.style";
import { cx } from "emotion";

type Props = {
  onClick?: () => void;
  children: string | ReactElement;
  color?: "primary" | "secondary";
  variant?: "contained" | "text";
};

export const Button = ({
  onClick,
  children,
  color = "primary",
  variant = "contained"
}: Props) => {
  const buttonClasses = cx(classes.root, {
    [classes.primaryContained]: color === "primary" && variant === "contained",
    [classes.secondaryContained]:
      color === "secondary" && variant === "contained"
  });

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};
