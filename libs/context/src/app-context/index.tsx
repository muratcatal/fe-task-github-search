import { searchActor } from '@fetask/states';
import React, { createContext, useContext } from 'react';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext(searchActor);

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AppContext.Provider value={searchActor}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
