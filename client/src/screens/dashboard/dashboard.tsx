import React from "react";
import { Typography, Container, Card, Grid } from "@material-ui/core";
import { useStore } from "../../components";
import { Redirect, RouteComponentProps } from "@reach/router";
import { routes } from "../../config";
import { Paper } from "../../components/paper";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  KeyboardArrowRight
} from "@material-ui/icons";
import { LinkBox } from "../../components/link-box";
import { Layout } from "../../components/layout";
type Props = RouteComponentProps;
export const Dashboard = ({}: Props) => {
  const { veenupToken } = useStore();
  if (!veenupToken) {
    return <Redirect to={routes.signIn} noThrow />;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <LinkBox
          to={routes.addFacebook}
          title="Manage your Facebook"
          subtitle="Connect you Facebook account"
          icon="Facebook"
        />
        <LinkBox
          to={routes.addFacebook}
          title="Manage your Instagram"
          subtitle="Connect you Instagram account"
          icon="Instagram"
        />
        <LinkBox
          to={routes.addFacebook}
          title="Manage your Twitter"
          subtitle="@MaybeJeZBrna"
          icon="Twitter"
        />
      </Grid>
    </Container>
  );
};
