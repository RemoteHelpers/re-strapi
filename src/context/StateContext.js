/* eslint-disable react/jsx-filename-extension */
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [localization, setLocalization] = useState('uk');

  return (
    <Context.Provider
      value={{
        localization,
        setLocalization,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
