import React, { ReactNode } from "react";
import { Layout } from "../layout";
import { RouteComponentProps, Redirect, navigate } from "@reach/router";
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
  const { setVeenupToken } = useStore();

  // logout from app
  const handleLogOut = () => {
    cookies.remove("token");
    setVeenupToken("");

    navigate(routes.signIn)
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
