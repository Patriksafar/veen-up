import React, { useEffect, useState } from "react";
import { Button, useStore, Box } from "../../components";
import { Container, Typography } from "@material-ui/core";
import { RouteComponentProps, Router } from "@reach/router";

import { ManageFacebook } from "./manage-facebook";
import { ManageInstagram } from "./manage-instagram";
import { routes } from "../../config";

type Props = RouteComponentProps;

export const ManageSocialMedia = ({}: Props) => {
  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Add your social accounts
      </Typography>
      <Router>
        <ManageFacebook default path={routes.facebook} />
        <ManageInstagram path={routes.instagram} />
      </Router>
    </Container>
  );
};
