import React, { useState, useEffect } from "react";
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
import { getData } from "../../utils";
type Props = RouteComponentProps;
export const Dashboard = ({}: Props) => {
  const { veenupToken, fbUserData, setFbUserData } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (!fbUserData && veenupToken && !isLoading) {
      getData("http://localhost:5000/connected-accounts", veenupToken).then(
        response => {
          setIsLoading(false);
          if (
            response.length > 0 &&
            response[0] &&
            response[0].facebookAccount
          ) {
            const {
              token,
              email,
              name,
              image,
              accountUserId
            } = response[0].facebookAccount;

            setFbUserData({
              email: email,
              token: token,
              name: name,
              picture: image,
              fbUserId: accountUserId
            });
          }
        }
      );
    }
  }, []);

  if (!veenupToken) {
    return <Redirect to={routes.signIn} noThrow />;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <LinkBox
          to={routes.manageAccounts}
          title="Manage your Facebook"
          subtitle={fbUserData?.name || "Connect you Facebook account"}
          icon="Facebook"
        />
        <LinkBox
          to={routes.manageAccounts}
          title="Manage your Instagram"
          subtitle="Connect you Instagram account"
          icon="Instagram"
        />
        <LinkBox
          to={routes.manageAccounts}
          title="Manage your Twitter"
          subtitle="@MaybeJeZBrna"
          icon="Twitter"
        />
      </Grid>
    </Container>
  );
};
