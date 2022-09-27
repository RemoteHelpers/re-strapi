import React from 'react';
import './App.scss';
import { Vacancies } from './blocks/Vacancies/Vacancies';
import Header from './blocks/Header/Header';
import MainScreen from './blocks/MainScreen/MainScreen';
import FeedbackForm from './components/forms/feedbackForm';
import Spheres from './blocks/Spheres/Spheres';
import FAQ from './blocks/FAQ/FAQ';
import Partners from './blocks/Partners/Partners';
import Testimonials from './blocks/Testimonials/Testimonials';
import Footer from './blocks/Footer/Footer';

export const App: React.FC = () => {
  return (
    <>
      <Header />
      <MainScreen />
      <div className="container">
        <Spheres />
        <Vacancies />
        <FAQ />
        <Partners />
      </div>
      <Testimonials />
      <div className="container">
        <FeedbackForm />
      </div>
      <Footer />
    </>
  );
};
