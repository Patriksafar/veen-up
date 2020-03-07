import React, { createContext, useState, ReactNode } from 'react';

type FacebookUserStateProps = {
  isLoggedIn: boolean,
  userID?: string,
  name?: string,
  email?: string,
  picture?: string,
  token?: string,
};

type Props = {
  children: ReactNode
}

type API = {
  fbUserData: FacebookUserStateProps
  setFbUserData: (s: FacebookUserStateProps ) => void
  listOfPages: any,
  setListOfPages: (s: any ) => void,
}

export const StoreContext = createContext<API | null>(null);

export const StoreProvider = ({ children }: Props) => {
  const [fbUserData, setFbUserData] = useState<FacebookUserStateProps>({isLoggedIn: false});
  const [listOfPages, setListOfPages] = useState(null);

  const api: API = {
    fbUserData,
    setFbUserData,
    listOfPages,
    setListOfPages,
  };

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
};
