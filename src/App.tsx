import React from 'react';
import './App.scss';
import { Vacancies } from './components/vacancies/Vacancies';
import Header from './components/header/Header';
import MainScreen from './components/mainScreen/MainScreen';
import FeedbackForm from './components/forms/feedbackForm';
import Spheres from './components/spheres/Spheres';
import FAQ from './components/faq/FAQ';
import Partners from './components/partners/Partners';
import Testimonials from './components/testimonials/Testimonials';
import Footer from './components/footer/Footer';

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
