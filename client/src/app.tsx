import React from "react";
import { StoreProvider, ConnectFacebook, FacebookPageList } from "./components";

import { routes } from "./config/routes";
import { Router } from "@reach/router";
import { SignIn } from "./screens/sign-in";
import { SignUp } from "./screens/sign-up";
import { Layout } from "./components/layout";

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <SignUp path={routes.signUp} />
        <SignIn path={routes.signIn} />
        <ConnectFacebook path={routes.addFacebook} />
        <FacebookPageList path={routes.list} />
      </Router>
    </StoreProvider>
  );
};
