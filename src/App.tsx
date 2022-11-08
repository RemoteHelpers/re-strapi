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
import axios from "axios";

const API = "http://testseven.rh-s.com:1733/api";

const App: React.FC = () => {
  const {
    scrollToTop,
    localization,
    isSubmitLocalization,
    isDesktopMenuOpened,
    setHeaderData,
    setFooterData,
  } = useStateContext();

  const rule = window.location.pathname === "/" && isSubmitLocalization;

  if (window.location.pathname === "/" && isSubmitLocalization) {
    window.location.pathname = `/${localization}/`;
  }

  useEffect(() => {
    const prevLanguage = window.location.pathname.split("/")[1];
    const prevURL = window.location.pathname.split("/");
    prevURL.splice(0, 2);
    const match = prevURL.join("/");
    if (localization !== prevLanguage && isSubmitLocalization) {
      window.location.pathname = `/${localization}/${match}`;
    }
  }, [localization]);

  useEffect(() => {
    axios
      .get(`${API}/header?locale=${localization}`)
      .then((res) => {
        setHeaderData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  useEffect(() => {
    axios
      .get(`${API}/footer?locale=${localization}`)
      .then((res) => {
        setFooterData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  return (
    <>
      <BrowserRouter basename={isSubmitLocalization ? `/${localization}` : ""}>
        {!isSubmitLocalization && <ChooseLanguagePage />}
        <div ref={scrollToTop}></div>
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
    </>
  );
};

export default App;
