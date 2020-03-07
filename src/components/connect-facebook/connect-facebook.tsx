import FacebookLogin from "react-facebook-login";

import React from "react";
import { useStore } from "../store";
import { RouteComponentProps, navigate } from "@reach/router";
import { Button } from "../button";
import { routes } from "../../config";

type Props = RouteComponentProps;

export const ConnectFacebook = ({}: Props) => {
  const { fbUserData, setFbUserData } = useStore();

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
      callback={responseFacebook}
    />
  );
};
