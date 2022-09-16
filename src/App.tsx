import React from 'react';
import './App.scss';
import { Vacancies } from './blocks/Vacancies/Vacancies';
// import FeedbackForm from './components/forms/feedbackForm';

export const App: React.FC = () => {
  return (
    <>
      <Vacancies />
      Vacancy branch
      {/* <FeedbackForm /> */}
    </>
  );
};
