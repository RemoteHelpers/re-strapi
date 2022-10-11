/* eslint-disable padding-line-between-statements */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [localization, setLocalization] = useLocalStorage("localization", "ua");
  const [isSubmitLocalization, setIsSubmitLocalization] = useLocalStorage(
    "isSubmitLocalization",
    false
  );

  const [isDesktopMenuOpened, setIsDesktopMenuOpened] = useState(false);
  // const [localization, setLocalization] = useState("ua");
  // const [isSubmitLocalization, setIsSubmitLocalization] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState("");

  return (
    <Context.Provider
      value={{
        localization,
        setLocalization,
        isSubmitLocalization,
        setIsSubmitLocalization,
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
