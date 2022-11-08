/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useContext, useState, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [localization, setLocalization] = useLocalStorage("localization", "uk");
  const [isSubmitLocalization, setIsSubmitLocalization] = useLocalStorage(
    "isSubmitLocalization",
    false
  );

  const [isDesktopMenuOpened, setIsDesktopMenuOpened] = useState(false);
  // const [localization, setLocalization] = useState("ua");
  // const [isSubmitLocalization, setIsSubmitLocalization] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState();
  const [headerData, setHeaderData] = useState();
  const [homeData, setHomeData] = useState();
  const [footerData, setFooterData] = useState();
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const scrollToTop = useRef(null);
  const scrollToHomeForm = useRef(null);

  return (
    <Context.Provider
      value={{
        scrollToHomeForm,
        scrollToTop,
        localization,
        setLocalization,
        isSubmitLocalization,
        setIsSubmitLocalization,
        currentVacancy,
        setCurrentVacancy,
        isDesktopMenuOpened,
        setIsDesktopMenuOpened,
        homeData,
        setHomeData,
        headerData,
        setHeaderData,
        footerData,
        setFooterData,
        isFormSubmited,
        setIsFormSubmited,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
