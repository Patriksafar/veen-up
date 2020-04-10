import { css } from "emotion";

export const root = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalPaper = css`
  width: 100%;
  max-width: 500px;
  padding: 16px;

  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.06),
    0px 6px 10px 0px rgba(0, 0, 0, 0.042), 0px 1px 18px 0px rgba(0, 0, 0, 0.036);
`;
