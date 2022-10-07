/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useStateContext } from "./context/StateContext";
import "./App.scss";

import VacancyDetails from "./pages/vacancyDetails";
import Header from "./components/header/Header";
import Footer from "./components/footer";

import HomePage from "./pages/homePage";
import AboutPage from "./pages/about";
import VideoInterview from "./pages/videoInterview";
import VacanciesPage from "./pages/vacanciesPage";
import ThankYouPage from "./pages/thankYouPage";
import NotFoundPage from "./pages/notFoundPage";

const App: React.FC = () => {
  const { currentVacancy } = useStateContext();

  return (
    <>
      <BrowserRouter>
        <Header />
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
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
