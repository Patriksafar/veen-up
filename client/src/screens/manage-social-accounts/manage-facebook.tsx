import React, { useEffect, useState } from "react";
import { Button, useStore, Box } from "../../components";
import {
  Container,
  Typography,
  Grid,
  Card,
  Paper,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { RouteComponentProps } from "@reach/router";
import FacebookLogin from "react-facebook-login";

import * as buttonClasses from "../../components/button/button.style";

import { cx } from "emotion";
import { Facebook as FacebookIcon } from "@material-ui/icons";
import { parseJwt, postData, getData } from "../../utils";
import { Router } from "express";
import { ManageFacebookPages } from "./manage-facebook-pages";

type Props = RouteComponentProps;
export const ManageFacebook = ({}: Props) => {
  const { veenupToken, fbUserData, setFbUserData } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (fbUserData) {
      return;
    }

    setIsLoading(true);
    if (veenupToken && !isLoading) {
      getData("http://localhost:5000/connected-accounts", veenupToken).then(
        (response) => {
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
              accountUserId,
            } = response[0].facebookAccount;

            setFbUserData({
              email: email,
              token: token,
              name: name,
              picture: image,
              fbUserId: accountUserId,
            });
          }
        }
      );
    }
  }, []);

  const responseFacebook = (response: any) => {
    const { accessToken, name, email, picture, id } = response;

    if (accessToken && name && email && veenupToken) {
      fetch(
        `https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1699457083617896&client_secret=86b849bbeb31d3d04a579433bb3e7746&fb_exchange_token=${accessToken}`
      )
        .then((response) => response.json())
        .then((responseData) => {
          //send it to database
          postData(
            "http://localhost:5000/connected-accounts",
            {
              facebook: {
                token: responseData.access_token,
                name: name,
                email: email,
                image: picture.data.url,
                enumType: "Facebook",
                accountUserId: id,
              },
            },
            veenupToken
          )
            .then((response) => {
              const {
                token,
                email,
                name,
                image,
                accountUserId,
              } = response.connectedSocialAccounts.facebookAccount;

              // on success set state
              setFbUserData({
                email: email,
                token: token,
                name: name,
                picture: image,
                fbUserId: accountUserId,
              });
            })
            .catch();
        });
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  const getContent = () => {
    if (fbUserData) {
      return (
        <div>
          <Paper>
            <Avatar src={fbUserData.picture}></Avatar>
            <Typography>{fbUserData.name}</Typography>
          </Paper>
          <ManageFacebookPages />
        </div>
      );
    }

    return (
      <div>
        <Typography variant="body1" gutterBottom>
          Add Facebook account
        </Typography>
        <Card>
          <Paper>
            <Box
              endAdornment={
                <FacebookLogin
                  appId="1699457083617896"
                  fields="name,email,picture"
                  scope="public_profile,email,user_birthday,manage_pages,publish_pages,pages_show_list,read_insights,pages_messaging"
                  returnScopes
                  textButton="Add Facebook"
                  callback={responseFacebook}
                  cssClass={cx(
                    buttonClasses.root,
                    buttonClasses.primaryContained,
                    buttonClasses.smallerPadding
                  )}
                />
              }
            >
              <FacebookIcon />
              <Typography>
                You have not connected your facebook account yet
              </Typography>
            </Box>
          </Paper>
        </Card>
      </div>
    );
  };

  return getContent();
};
