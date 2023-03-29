import { createContext, useContext, useState, useRef } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [localization, setLocalization] = useLocalStorage("localization", "ru");
  const [isSubmitLocalization, setIsSubmitLocalization] = useLocalStorage(
    "isSubmitLocalization",
    false
  );

  // Pages Data
  const [headerData, setHeaderData] = useState();
  const [homeData, setHomeData] = useState();
  const [footerData, setFooterData] = useState();

  const [isDesktopMenuOpened, setIsDesktopMenuOpened] = useState(false);
  const [currentVacancy, setCurrentVacancy] = useState();
  const [isFormSubmited, setIsFormSubmited] = useState(false);
  const scrollToTop = useRef(null);
  const scrollToTopVacancies = useRef(null);
  const scrollToHomeForm = useRef(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFormSubmitError, setIsFormSubmitError] = useState(false);
  const [categorySlug, setCategorySlug] = useState([]);
  const [currentGlobalVacancies, setCurrentGlobalVacancies] = useState([]);
  const [globalCategories, setGlobalCategories] = useState([]);
  const [langInputValue, setLangInputValue] = useState('');

  return (
    <Context.Provider
      value={{
        langInputValue,
        setLangInputValue,
        globalCategories,
        setGlobalCategories,
        currentGlobalVacancies,
        setCurrentGlobalVacancies,
        categorySlug,
        setCategorySlug,
        scrollToTopVacancies,
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
        isOpenModal,
        setIsOpenModal,
        setIsFormSubmitError,
        isFormSubmitError,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
