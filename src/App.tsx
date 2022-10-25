/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-const */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable import/order */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import "./App.scss";

import Footer from "./components/footer";
import Header from "./components/header";

import HomePage from "./pages/homePage";
import AboutPage from "./pages/about";
import VideoInterview from "./pages/videoInterview";
import VacancyDetails from "./pages/vacancyDetails";
import VacanciesPage from "./pages/vacanciesPage";
import ThankYouPage from "./pages/thankYouPage";
import ChooseLanguagePage from "./pages/chooseLanguagePage";
import NotFoundPage from "./pages/notFoundPage/notFoundPage";

const App: React.FC = () => {
  const {
    localization,
    currentVacancy,
    isSubmitLocalization,
    isDesktopMenuOpened,
  } = useStateContext();

  if (window.location.pathname === "/") {
    window.location.pathname = `/${localization}/`;
  }

  useEffect(() => {
    const prevLanguage = window.location.pathname.split("/")[1];
    const prevURL = window.location.pathname.split("/");
    prevURL.splice(0, 2);
    const match = prevURL.join("/");
    if (localization !== prevLanguage) {
      window.location.pathname = `/${localization}/${match}`;
    }
  }, [localization]);

  return (
    <>
      {isSubmitLocalization ? (
        <BrowserRouter basename={`/${localization}`}>
          <Header />
          <main className={isDesktopMenuOpened ? "desktopMenuOpened" : ""}>
            <div className={isDesktopMenuOpened ? "darken" : "no-darken"}></div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="vacancies" element={<VacanciesPage />} />
              <Route path="vacancies/:vacancyID" element={<VacancyDetails />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="videoInterview" element={<VideoInterview />} />
              <Route path="thankyou" element={<ThankYouPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path={`/${localization}`} element={<ChooseLanguagePage />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
