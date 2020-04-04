import React from "react";
import { useStore } from "../store";
import { RouteComponentProps, Redirect } from "@reach/router";
import { Button } from "../button";
import { Avatar } from "../avatar";
import { Box } from "../box";
import { routes } from "../../config";
import { Paper } from "../paper";
import { Container } from "@material-ui/core";

type Props = RouteComponentProps;

export const FacebookPageList = ({}: Props) => {
  const { fbUserData } = useStore();
  const { veenupToken } = useStore();

  if (!veenupToken) {
    return <Redirect to={routes.signIn} noThrow />;
  }

  const handleAddPost = (id: string, token: string) => {
    const pageId = id;
    const pageToken = token;
    const pageTokenRequestUrl = `https://graph.facebook.com/v6.0/${pageId}/feed?message=Hello Fan!&access_token=${pageToken}`;
    fetch(pageTokenRequestUrl, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.id) {
          alert("přidáno!!!");
        } else if (responseData.error.error_user_msg) {
          alert(responseData.error.error_user_msg);
        }
      });
  };

  const getListOfAccountPages = () => {
    const pageTokenRequestUrl = `https://graph.facebook.com/${fbUserData?.fbUserId}/accounts?fields=access_token,picture,name,link&access_token=${fbUserData?.token}`;
    fetch(pageTokenRequestUrl)
      .then((response) => response.json())
      .then((responseData) => {
        const { data } = responseData;
        // setListOfPages(data);
      });
  };

  return <Container>Tada</Container>;
};
