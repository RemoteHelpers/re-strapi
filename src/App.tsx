/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.scss';
// import Header from './components/header/Header';

import VacancyDetails from "./pages/vacancyDetails";
import AboutPage from "./pages/about";
import NavBar from "./components/NavBar";
import VideoInterview from "./pages/videoInterview";
import VacanciesPage from "./pages/vacanciesPage";
import Footer from './components/footer';

import HomePage from './pages/homePage';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vacancies" element={<VacanciesPage />} />
          <Route path="/vacancies/:currentVacancy" element={<VacancyDetails />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="videoInterview" element={<VideoInterview />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
