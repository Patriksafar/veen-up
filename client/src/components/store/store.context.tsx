import React, { createContext, useState, ReactNode, useEffect } from "react";

import Cookies from "universal-cookie";

type FacebookUserStateProps = {
  isLoggedIn: boolean;
  userID?: string;
  name?: string;
  email?: string;
  picture?: string;
  token?: string;
};

type Props = {
  children: ReactNode;
};

type API = {
  fbUserData: FacebookUserStateProps;
  setFbUserData: (s: FacebookUserStateProps) => void;
  listOfPages: any;
  setListOfPages: (s: any) => void;
  veenupToken: string | null;
  setVeenupToken: (s: string) => void;
};

export const StoreContext = createContext<API | null>(null);

// const getCookie = (cname: string) => {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(";");
//   for (var i = 0; i < ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// };

const cookies = new Cookies();

export const StoreProvider = ({ children }: Props) => {
  const [fbUserData, setFbUserData] = useState<FacebookUserStateProps>({
    isLoggedIn: false
  });
  const [listOfPages, setListOfPages] = useState(null);
  const [veenupToken, setVeenupToken] = useState<string | null>(
    cookies.get("token")
  );

  useEffect(() => {
    if (!cookies.get("token") && veenupToken) {
      cookies.set("token", veenupToken, { path: "/" });
    }
  }, [veenupToken]);

  const api: API = {
    fbUserData,
    setFbUserData,
    listOfPages,
    setListOfPages,
    veenupToken,
    setVeenupToken
  };

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
};
