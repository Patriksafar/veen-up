import { css } from "emotion";
import * as theme from "../../theme/pallete";

export const root = css`
  font-size: 16px;
  border-radius: 4px;
  padding: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;

export const primaryContained = css`
  color: white;
  background: ${theme.gradients.primary};
`;

export const secondaryContained = css`
  color: white;
  background: ${theme.gradients.secondary};
`;

export const smallerPadding = css`
  padding: 12px 16px;
`;

export const transparentContained = css`
  color: ${theme.text.main};
  outline: none;

  &:hover {
    background: #f3f3f3;
  }

  &:active {
    background: #dedede;
  }
`;
