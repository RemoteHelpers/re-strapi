/* eslint-disable react/jsx-filename-extension */
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [localization, setLocalization] = useState('uk');
  const [currentVacancy, setCurrentVacancy] = useState('');
  const [isDesktopMenuOpened, setIsDesktopMenuOpened] = useState(false);

  return (
    <Context.Provider
      value={{
        localization,
        setLocalization,
        currentVacancy,
        setCurrentVacancy,
        isDesktopMenuOpened,
        setIsDesktopMenuOpened,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
