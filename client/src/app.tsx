import React from "react";
import { StoreProvider, ConnectFacebook, FacebookPageList } from "./components";

import { routes } from "./config/routes";
import { Router } from "@reach/router";

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <ConnectFacebook path={routes.index} />
        <FacebookPageList path={routes.list} />
      </Router>
    </StoreProvider>
  );
};
