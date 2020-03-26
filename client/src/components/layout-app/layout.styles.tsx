import { css } from "emotion";

const drawerWidth = 240;

export const root = css`
  display: "flex";
`;

export const appBar = css`
  width: calc(100% - ${drawerWidth}px);
  margin-left: ${drawerWidth}px;
`;
export const drawer = css`
  width: ${drawerWidth}px;
  flex-shrink: 0;
`;

export const drawerPaper = css`
  width: ${drawerWidth}px;
`;
export const content = css`
  flex-grow: 1;
  padding: 30px;
`;
