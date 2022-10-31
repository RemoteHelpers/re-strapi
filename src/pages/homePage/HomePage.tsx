/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { useStateContext } from "../../context/StateContext";
import VacancyList from "../../components/vacanciesList";
import FAQ from "../../components/faq/FAQ";
import FeedbackForm from "../../components/forms/feedbackForm";
import MainScreen from "../../components/mainScreen/MainScreen";
import Partners from "../../components/partners/Partners";
import Spheres from "../../components/spheres";
import Testimonials from "../../components/testimonials";
import cl from "./HomePage.module.scss";

export const HomePage = () => {
  const { scrollToHomeForm } = useStateContext();

  return (
    <>
      <MainScreen />
      <div className={cl.container}>
        <div className={cl.content_wrapper}>
          <div className={cl.spheres_wrapper}>
            <h1 className={cl.mainTitle}>
              Наші основні
              <br />
              сфери діяльності
            </h1>
            <Spheres />
          </div>
          <VacancyList />
          <FAQ />
          <Partners />
        </div>
        <div className={cl.testimonials_wrapper}>
          <Testimonials />
        </div>
        <div className={cl.content_wrapper}>
          <div className={cl.form_wrapper} ref={scrollToHomeForm}>
            <FeedbackForm />
          </div>
        </div>
      </div>
    </>
  );
};
