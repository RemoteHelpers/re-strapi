/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import { Helmet } from "react-helmet";

import "./App.scss";

import Footer from "./components/footer";
import Header from "./components/header";

import HomePage from "./pages/homePage";
import AboutPage from "./pages/about";
import VideoInterview from "./pages/videoInterview";
import VacancyDetails from "./pages/vacancyDetails";
import VacanciesPage from "./pages/vacanciesPage";
import ThankYouPage from "./pages/thankYouPage";
import CategoryPage from "./pages/CategoryPage";
import NotFoundPage from "./pages/notFoundPage/notFoundPage";
import ChooseLanguageModal from "./components/chooseLanguageModal";
import FormSubmitErrorPage from "./pages/formSubmitErrorPage";
import ContactPage from "./pages/ContactPage";

import { API } from "./constants";

const App: React.FC = () => {
  const {
    scrollToTop,
    localization,
    isSubmitLocalization,
    isDesktopMenuOpened,
    headerData,
    setHeaderData,
    setFooterData,
    setIsOpenModal,
    isFormSubmitError,
    setFormData,
  } = useStateContext();
  const navigate = useNavigate();
  const routingRule = localization === "ru";

  // TODO rewrite logic
  useEffect(() => {
    const prevLanguage = window.location.pathname.split("/")[1];
    const prevURL = window.location.pathname.split("/");
    const localsArray = ["en", "ua", "pl", "sk", "ru"];
    if (localsArray.includes(prevURL[1])) {
      prevURL.splice(1, 1);
    }
    const match = prevURL.filter(Boolean).join("/");
    if (routingRule) {
      return navigate(`${match}`);
    }
    if (localization !== prevLanguage) {
      navigate(`/${localization}/${match}`);
    }
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/header?locale=${
          localization === "ua" ? "uk" : localization
        }&populate=*`
      )
      .then((res) => {
        setHeaderData(res.data.data.attributes);
        // console.log(res.data.data.attributes);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/footer?locale=${localization === "ua" ? "uk" : localization}`
      )
      .then((res) => {
        setFooterData(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  useEffect(() => {
    axios
      .get(`${API}/form?locale=${localization === "ua" ? "uk" : localization}&populate=*`)
      .then((res) => {
        setFormData(res.data.data.attributes)
        // console.log(res.data.data.attributes);
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

  return (
    <>
      <Helmet>
        <meta name="description" content={headerData?.meta} />
      </Helmet>
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
                  ? `/:categoryID/:vacancyID`
                  : `/:lng/:categoryID/:vacancyID`
              }
              element={<VacancyDetails />}
            />
            <Route
              path={routingRule ? "/:categoryID" : "/:lng/:categoryID"}
              element={<CategoryPage />}
            />
            <Route
              path={routingRule ? "/about" : "/:lng/about"}
              element={<AboutPage />}
            />
            <Route
              path={routingRule ? "/contacts" : "/:lng/contacts"}
              element={<ContactPage />}
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
