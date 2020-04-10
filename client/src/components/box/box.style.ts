import { css } from "emotion";

export const root = css`
  display: flex;
  width: 100%;
  border-radius: 16px;
  padding: 8px;
`;

export const startAdornment = css`
  margin-right: 16px;
  align-self: flex-start;
`;

export const endAdornment = css`
  margin-left: 16px;
  align-self: flex-end;
`;

export const content = css`
  flex: 1 1 auto;
`;
