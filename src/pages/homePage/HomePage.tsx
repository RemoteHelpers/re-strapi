/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import VacancyList from "../../components/vacanciesList";
import FAQ from "../../components/faq/FAQ";
import FeedbackForm from "../../components/forms/feedbackForm";
import MainScreen from "../../components/mainScreen/MainScreen";
import Partners from "../../components/partners/Partners";
import Spheres from "../../components/spheres";
import Testimonials from "../../components/testimonials";
import catWithMeshura from "../../images/formImg.png";
import cl from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <>
      <MainScreen />
      <div className={cl.container}>
        <Spheres />
        <VacancyList />
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
