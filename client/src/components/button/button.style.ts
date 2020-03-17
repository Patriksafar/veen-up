import { css } from "emotion";
import * as theme from "../../theme/pallete";

export const root = css`
  font-size: 16px;
  border-radius: 4px;
  padding: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const primaryContained = css`
  color: white;
  background: ${theme.gradients.primary};
`;

export const secondaryContained = css`
  color: white;
  background: ${theme.gradients.secondary};
`;
