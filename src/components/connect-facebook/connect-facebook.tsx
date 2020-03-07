import FacebookLogin from 'react-facebook-login'
import React from 'react'
import { useStore } from '../store'


export const ConnectFacebook = () => {
  const { fbUserData, setFbUserData } = useStore();

  if (fbUserData.isLoggedIn) {
    return null;
  }

  const responseFacebook = (response: any) => {
    const {
      name, email, picture, userID, accessToken,
    } = response;
    if (userID) {
      setFbUserData({
        isLoggedIn: true,
        userID,
        name,
        email,
        picture: picture.data.url,
        token: accessToken,
      });
    }
  };

  // eslint-disable-next-line consistent-return
  return (
    <FacebookLogin
      appId="1699457083617896"
      autoLoad={false}
      fields="name,email,picture"
      scope="public_profile,email,user_birthday,manage_pages,publish_pages,pages_show_list,read_insights,pages_messaging"
      returnScopes
      callback={responseFacebook}
    />
  );
};
