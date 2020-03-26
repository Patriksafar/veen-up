import React, { createContext, useState, ReactNode, useEffect } from "react";

import Cookies from "universal-cookie";
import { parseJwt } from "../../utils";

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
  userId: string
};

export const StoreContext = createContext<API | null>(null);

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

  const userId = veenupToken && parseJwt(veenupToken).id

  const api: API = {
    fbUserData,
    setFbUserData,
    listOfPages,
    setListOfPages,
    veenupToken,
    setVeenupToken,
    userId
  };

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
};
