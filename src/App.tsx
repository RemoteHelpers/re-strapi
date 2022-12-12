/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable comma-dangle */
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
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import { Helmet } from 'react-helmet';
import { META } from './database/common/meta';

import "./App.scss";

import Footer from "./components/footer";
import Header from "./components/header";

import HomePage from "./pages/homePage";
import AboutPage from "./pages/about";
import VideoInterview from "./pages/videoInterview";
import VacancyDetails from "./pages/vacancyDetails";
import VacanciesPage from "./pages/vacanciesPage";
import ThankYouPage from "./pages/thankYouPage";
import ChooseLanguagePage from "./components/modalContent";
import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import axios from "axios";
import ChooseLanguageModal from "./components/chooseLanguageModal";
import FormSubmitErrorPage from "./pages/formSubmitErrorPage";

// const API = "http://testseven.rh-s.com:1733/api";
const API = "http://localhost:1733/api";

const App: React.FC = () => {
  const {
    scrollToTop,
    localization,
    isSubmitLocalization,
    isDesktopMenuOpened,
    setHeaderData,
    setFooterData,
    setIsOpenModal,
    isFormSubmitError,
  } = useStateContext();

  const navigate = useNavigate();

  const routingRule = localization === "ru";

  useEffect(() => {
    const prevLanguage = window.location.pathname.split("/")[1];
    const prevURL = window.location.pathname.split("/");
    prevURL.splice(0, 2);
    const match = prevURL.join("/");
    if (routingRule) {
      return navigate(`/${match}`);
    }
    if (localization !== prevLanguage) {
      navigate(`/${localization}/${match}`);
    }
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/header?locale=${localization === "ua" ? "uk" : localization}`
      )
      .then((res) => {
        setHeaderData(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/footer?locale=${localization === "ua" ? "uk" : localization}`
      )
      .then((res) => {
        setFooterData(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  if (!isSubmitLocalization) {
    setTimeout(() => {
      setIsOpenModal(true);
    }, 1000);
  }

  const metaDatas = META.find(
    (el) => el.language === localization
  )?.data;

  return (
    <>
      {metaDatas?.map((item: any) => (
        <Helmet key={item.id}>
          <meta name="description" content={item.description} />
        </Helmet>
      ))}
      <ChooseLanguageModal />
      <div ref={scrollToTop}></div>
      <Header />
      {!isFormSubmitError ? (
        <main className={isDesktopMenuOpened ? "desktopMenuOpened" : ""}>
          <div className={isDesktopMenuOpened ? "darken" : "no-darken"}></div>
          <Routes>
            <Route
              path={routingRule ? "/" : `/${localization}/`}
              element={<HomePage />}
            />
            <Route
              path={routingRule ? "/vacancies" : "/:lng/vacancies"}
              element={<VacanciesPage />}
            />
            <Route
              path={
                routingRule
                  ? "/vacancies/:vacancyID"
                  : "/:lng/vacancies/:vacancyID"
              }
              element={<VacancyDetails />}
            />
            <Route
              path={routingRule ? "/about" : "/:lng/about"}
              element={<AboutPage />}
            />
            <Route
              path={routingRule ? "/videoInterview" : "/:lng/videoInterview"}
              element={<VideoInterview />}
            />
            <Route
              path={routingRule ? "/thankyou" : "/:lng/thankyou"}
              element={<ThankYouPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      ) : (
        <FormSubmitErrorPage />
      )}
      <Footer />
    </>
  );
};

export default App;
