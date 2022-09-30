/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-no-bind */

import React from "react";
import "./App.scss";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import VacancyDetails from "./pages/vacancyDetails";
import AboutPage from "./pages/about";
import NavBar from "./components/NavBar";
import VideoInterview from "./pages/videoInterview";
import VacanciesPage from "./pages/vacanciesPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<VacanciesPage />} />
        <Route path="/vacancies/:currentVacancy" element={<VacancyDetails />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="videoInterview" element={<VideoInterview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
