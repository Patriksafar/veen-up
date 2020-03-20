import React from "react";
import { StoreProvider, ConnectFacebook, FacebookPageList } from "./components";

import { routes } from "./config/routes";
import { Router } from "@reach/router";
import { SignUp } from "./screens/singup";
import { Layout } from "./components/layout";

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <SignUp path={routes.signup} />
        <ConnectFacebook path={routes.addFacebook} />
        <FacebookPageList path={routes.list} />
      </Router>
    </StoreProvider>
  );
};
