import FacebookLogin from "react-facebook-login";

import React from "react";
import { useStore } from "../store";
import { RouteComponentProps, navigate, Redirect } from "@reach/router";
import { Button } from "../button";
import { routes } from "../../config";

import * as buttonClasses from "../button/button.style";
import { cx } from "emotion";

type Props = RouteComponentProps;

export const ConnectFacebook = ({}: Props) => {
  const { fbUserData, setFbUserData, veenupToken } = useStore();

  if (!veenupToken) {
    return <Redirect noThrow to={routes.signIn} />;
  }

  function parseJwt(token: string) {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function(c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  console.log(parseJwt(veenupToken).id);

  if (fbUserData.isLoggedIn) {
    navigate(routes.list, { replace: true });
  }

  const responseFacebook = (response: any) => {
    console.log(response);

    const { name, email, picture, userID, accessToken } = response;
    if (userID) {
      setFbUserData({
        isLoggedIn: true,
        userID,
        name,
        email,
        picture: picture.data.url,
        token: accessToken
      });
      navigate(routes.list);
    }
  };

  // eslint-disable-next-line consistent-return
  return (
    <FacebookLogin
      appId="1699457083617896"
      fields="name,email,picture"
      scope="public_profile,email,user_birthday,manage_pages,publish_pages,pages_show_list,read_insights,pages_messaging"
      returnScopes
      textButton="Facebook"
      callback={responseFacebook}
      cssClass={cx(buttonClasses.root, buttonClasses.primaryContained)}
    />
  );
};
