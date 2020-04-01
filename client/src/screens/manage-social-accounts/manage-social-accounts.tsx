import React from "react";
import { Button, useStore } from "../../components";
import { Container, Typography } from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import FacebookLogin from "react-facebook-login";

import * as buttonClasses from "../../components/button/button.style";

import { cx } from "emotion";
import { Facebook } from "@material-ui/icons";
import { parseJwt, postData } from "../../utils";

type Props = RouteComponentProps;

export const ManageSocialMedia = ({}: Props) => {
  const { veenupToken } = useStore();

  const responseFacebook = (response: any) => {
    const { accessToken, name, email } = response;
    console.log(response);

    if (accessToken && name && email && veenupToken) {
      console.log("sending to be");
      postData(
        "http://localhost:5000/connected-accounts",
        {
          facebook: {
            token: accessToken,
            name: name,
            email: email
          }
        },
        veenupToken
      )
        .then(response => {
          console.log(response);
        })
        .catch();
    }
  };

  return (
    <Container>
      <Typography variant="h6">Manage your social accounts</Typography>
      <FacebookLogin
        appId="1699457083617896"
        fields="name,email,picture"
        scope="public_profile,email,user_birthday,manage_pages,publish_pages,pages_show_list,read_insights,pages_messaging"
        returnScopes
        textButton="Add Facebook"
        callback={responseFacebook}
        cssClass={cx(buttonClasses.root, buttonClasses.primaryContained)}
      />
      <Button>Add Facebook</Button>
      <Button>Add Facebook</Button>
    </Container>
  );
};
