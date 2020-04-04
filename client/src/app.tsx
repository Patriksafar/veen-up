import React from "react";
import { StoreProvider, FacebookPageList, LayoutApp } from "./components";

import { routes } from "./config/routes";
import { Router, Redirect } from "@reach/router";
import { SignIn } from "./screens/sign-in";
import { SignUp } from "./screens/sign-up";

import { Dashboard } from "./screens/dashboard";
import { ManageSocialMedia } from "./screens/manage-social-accounts";

export const App = () => {
  return (
    <StoreProvider>
      <Router>
        <SignUp path={routes.signUp} />
        <SignIn path={routes.signIn} />
        <LayoutApp default>
          <Dashboard path={routes.dashboard} />
          <ManageSocialMedia path={routes.manageAccounts} />
          <FacebookPageList path={routes.list} />
        </LayoutApp>
        <Redirect to={routes.signIn} from="/" noThrow />
      </Router>
    </StoreProvider>
  );
};
