import React, { createContext, useState, ReactNode, useEffect } from "react";

import Cookies from "universal-cookie";
import { parseJwt, getData } from "../../utils";

type FacebookUserStateProps = {
  name?: string;
  email?: string;
  picture?: string;
  token?: string;
  fbUserId?: string;
};

type Props = {
  children: ReactNode;
};

type API = {
  fbUserData: FacebookUserStateProps | null;
  setFbUserData: (s: FacebookUserStateProps) => void;
  veenupToken: string;
  setVeenupToken: (s: string) => void;
  userId: string;
};

export const StoreContext = createContext<API | null>(null);

const cookies = new Cookies();

export const StoreProvider = ({ children }: Props) => {
  const [fbUserData, setFbUserData] = useState<FacebookUserStateProps | null>(
    null
  );
  const [veenupToken, setVeenupToken] = useState<string>(cookies.get("token"));

  useEffect(() => {
    if (!cookies.get("token") && veenupToken) {
      const tokenExp = new Date(parseJwt(veenupToken).exp * 1000);

      cookies.set("token", veenupToken, {
        path: "/",
        expires: tokenExp,
      });
    }
  }, [veenupToken]);

  const handleCookieChange = (name: any, value: any) => {
    console.log(name, value);
  };

  cookies.addChangeListener(() => handleCookieChange);

  const userId = veenupToken && parseJwt(veenupToken).id;

  const api: API = {
    fbUserData,
    setFbUserData,
    veenupToken,
    setVeenupToken,
    userId,
  };

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
};
