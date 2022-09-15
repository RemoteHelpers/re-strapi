import React from 'react';
import './App.scss';
import { Vacancies } from './blocks/Vacancies/Vacancies';
import Header from './blocks/Header/Header';
// import MainScreen from './blocks/MainScreen/MainScreen';
import FeedbackForm from './components/forms/feedbackForm';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      {/* <MainScreen /> */}
      <Vacancies />
      <FeedbackForm />
    </>
  );
};
