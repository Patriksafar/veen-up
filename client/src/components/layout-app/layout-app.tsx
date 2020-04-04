import React, { ReactNode } from "react";
import { Layout } from "../layout";
import { RouteComponentProps, Redirect, navigate, Link } from "@reach/router";
import { SideMenu } from "../menu";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import * as classes from "./layout.styles";
import Cookies from "universal-cookie";
import { routes } from "../../config";

import { PowerSettingsNewRounded } from "@material-ui/icons";
import { useStore } from "../store";
import { Logo } from "../logo";

type Props = {
  children: ReactNode;
} & RouteComponentProps;

const cookies = new Cookies();
export const LayoutApp = ({ children }: Props) => {
  const { setVeenupToken, veenupToken } = useStore();

  if (!veenupToken) {
    return <Redirect to={routes.signIn} noThrow />;
  }

  // logout from app
  const handleLogOut = () => {
    cookies.remove("token");
    setVeenupToken("");

    navigate(routes.signIn);
  };

  return (
    <Layout variant="screen">
      <nav>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <Logo />
          <List>
            <Link to={routes.dashboard}>
              <ListItem key="Dashboard">
                <ListItemIcon>
                  <PowerSettingsNewRounded />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
            </Link>
            <ListItem button key="logout" onClick={handleLogOut}>
              <ListItemIcon>
                <PowerSettingsNewRounded />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
          </List>
        </Drawer>
      </nav>
      <Layout variant="container">{children}</Layout>
    </Layout>
  );
};
