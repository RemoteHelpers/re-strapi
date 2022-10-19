import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useStateContext } from './context/StateContext';
import './App.scss';

import Footer from './components/footer';
import Header from './components/header';

import HomePage from './pages/homePage';
import AboutPage from './pages/about';
import VideoInterview from './pages/videoInterview';
import VacancyDetails from './pages/vacancyDetails';
import VacanciesPage from './pages/vacanciesPage';
import ThankYouPage from './pages/thankYouPage';
import ChooseLanguagePage from './pages/chooseLanguagePage';
import NotFoundPage from './pages/notFoundPage/notFoundPage';

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
                path={`/vacancies/:${currentVacancy}`}
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
