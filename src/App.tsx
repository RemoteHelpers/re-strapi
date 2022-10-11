/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-no-bind */
import React from "react";
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
import NotFoundPage from "./pages/notFoundPage/NotFoundPage";

const App: React.FC = () => {
  const { currentVacancy, isSubmitLocalization } = useStateContext();

  return (
    <>
      {isSubmitLocalization ? (
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/vacancies" element={<VacanciesPage />} />
              <Route
                path={`/vacancy/:${currentVacancy}`}
                element={<VacancyDetails />}
              />
              <Route path="about" element={<AboutPage />} />
              <Route path="videoInterview" element={<VideoInterview />} />
              <Route path="thankyou" element={<ThankYouPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      ) : (
        <ChooseLanguagePage />
      )}
    </>
  );
};

export default App;
