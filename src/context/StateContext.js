/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [localization, setLocalization] = useState("ua");
  const [isSubmitLocalization, setIsSubmitLocalization] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState("");

  return (
    <Context.Provider
      value={{
        localization,
        setLocalization,
        currentVacancy,
        setCurrentVacancy,
        isSubmitLocalization,
        setIsSubmitLocalization,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
