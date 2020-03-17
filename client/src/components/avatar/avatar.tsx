import React from "react";

import * as classes from "./avatar.style";
import { cx } from "emotion";

type Props = {
  src: string;
  alt?: string;
  variant?: "circle" | "rounded";
};

export const Avatar = ({ alt, src, variant = "circle" }: Props) => {
  const avatarClasses = cx(classes.root, {
    [classes.rounded]: variant === "rounded"
  });
  return <img src={src} alt={alt} className={avatarClasses} />;
};
