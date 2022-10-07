/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useStateContext } from './context/StateContext';
import './App.scss';
// import Header from './components/header/Header';

import VacancyDetails from "./pages/vacancyDetails";
import AboutPage from "./pages/about";
import Header from './components/header';
import VideoInterview from "./pages/videoInterview";
import VacanciesPage from "./pages/vacanciesPage";
import Footer from './components/footer';

import HomePage from './pages/homePage';

const App: React.FC = () => {
  const { currentVacancy } = useStateContext();

  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vacancies" element={<VacanciesPage />} />
            <Route path={`/vacancy/:${currentVacancy}`} element={<VacancyDetails />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="videoInterview" element={<VideoInterview />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
