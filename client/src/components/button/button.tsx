import React, { ReactElement, ButtonHTMLAttributes } from "react";

import * as classes from "./button.style";
import { cx } from "emotion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: string | ReactElement;
  color?: "primary" | "secondary";
  variant?: "contained" | "text";
};

export const Button = ({
  onClick,
  children,
  color = "primary",
  variant = "contained",
  ...other
}: Props) => {
  const buttonClasses = cx(classes.root, {
    [classes.primaryContained]: color === "primary" && variant === "contained",
    [classes.secondaryContained]:
      color === "secondary" && variant === "contained"
  });

  return (
    <button onClick={onClick} className={buttonClasses} {...other}>
      {children}
    </button>
  );
};
