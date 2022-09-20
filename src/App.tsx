/* eslint-disable react/jsx-no-bind */
import React from 'react';
import './App.scss';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/homePage';
import VacancyDetails from './pages/vacancyDetails';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="vacancy/:title/:id" element={<VacancyDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
