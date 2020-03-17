import { useContext } from 'react';

import { StoreContext } from './store.context';

export const useStore = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStoreContext must be used within a StoreContextProvider');
  }

  return context;
};
