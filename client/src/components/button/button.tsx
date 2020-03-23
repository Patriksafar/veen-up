import React, { ReactElement, ButtonHTMLAttributes } from "react";

import * as classes from "./button.style";
import { cx } from "emotion";
import { Link } from "@reach/router";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick?: () => void;
  children: string | ReactElement;
  color?: "primary" | "secondary" | "transparent";
  variant?: "contained" | "text";
  smallerPadding?: boolean;
  to?: string;
};

export const Button = ({
  onClick,
  children,
  color = "primary",
  variant = "contained",
  to,
  smallerPadding,
  ...other
}: Props) => {
  const buttonClasses = cx(classes.root, {
    [classes.transparentContained]:
      color === "transparent" && variant === "contained",
    [classes.primaryContained]: color === "primary" && variant === "contained",
    [classes.secondaryContained]:
      color === "secondary" && variant === "contained",
    [classes.smallerPadding]: smallerPadding
  });

  if (to) {
    return (
      <Link to={to} className={buttonClasses} role="button">
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses} {...other}>
      {children}
    </button>
  );
};
