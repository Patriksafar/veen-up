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
  veenupToken: string;
  setVeenupToken: (s: string) => void;
};

export const StoreContext = createContext<API | null>(null);

function getCookie(name: string) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  let end;

  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }

  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}

export const StoreProvider = ({ children }: Props) => {
  const defaultToken = getCookie("token") || "";

  const [fbUserData, setFbUserData] = useState<FacebookUserStateProps>({
    isLoggedIn: false
  });
  const [listOfPages, setListOfPages] = useState(null);
  const [veenupToken, setVeenupToken] = useState(defaultToken);

  useEffect(() => {
    if (!getCookie("token") && veenupToken) {
      document.cookie = `token=${veenupToken}`;
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
