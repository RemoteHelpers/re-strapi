/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Vacancies } from '../../components/vacancies/Vacancies';
import FAQ from '../../components/faq';
import FeedbackForm from '../../components/forms/feedbackForm';
import MainScreen from '../../components/mainScreen/MainScreen';
import Partners from '../../components/partners/Partners';
import Spheres from '../../components/spheres/Spheres';
import Testimonials from '../../components/testimonials/Testimonials';
import catWithMeshura from '../../images/formImg.png';
import cl from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <>
      <MainScreen />
      <div className={cl.container}>
        <Spheres />
        <Vacancies />
        <FAQ />
        <Partners />
      </div>
      <Testimonials />
      <div className={cl.container}>
        <FeedbackForm img={catWithMeshura} />
      </div>
    </>
  );
};
