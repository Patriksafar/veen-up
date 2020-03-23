import React from "react";
import { Typography, Container, Card, Grid } from "@material-ui/core";
import { useStore } from "../../components";
import { Redirect, RouteComponentProps } from "@reach/router";
import { routes } from "../../config";
import { Paper } from "../../components/paper";

type Props = RouteComponentProps;
export const Dashboard = ({}: Props) => {
  const { veenupToken } = useStore();
  if (!veenupToken) {
    return <Redirect to={routes.signIn} noThrow />;
  }

  return (
    <Container>
      <Typography variant="h3">Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper>Add facebook</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Card>Add facebook</Card>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
