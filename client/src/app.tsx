import React from "react";
import { StoreProvider, ConnectFacebook, FacebookPageList } from "./components";

import { routes } from "./config/routes";
import { Router, Redirect } from "@reach/router";
import { SignIn } from "./screens/sign-in";
import { SignUp } from "./screens/sign-up";
import { Layout } from "./components/layout";
import { Dashboard } from "./screens/dashboard";

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <SignUp path={routes.signUp} />
        <SignIn path={routes.signIn} />
        <Dashboard path={routes.dashboard} />
        <ConnectFacebook path={routes.addFacebook} />
        <FacebookPageList path={routes.list} />
        <Redirect to={routes.signIn} from="/" noThrow />
      </Router>
    </StoreProvider>
  );
};
