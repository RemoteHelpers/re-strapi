/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../context/StateContext";
import VacancyList from "../../components/vacanciesList";
import FAQ from "../../components/faq/FAQ";
import FeedbackForm from "../../components/forms/feedbackForm";
import MainScreen from "../../components/mainScreen/MainScreen";
import Partners from "../../components/partners/Partners";
import Spheres from "../../components/spheres";
import Testimonials from "../../components/testimonials";
import cl from "./HomePage.module.scss";

const API = "http://testseven.rh-s.com:1733/api";

export const HomePage = () => {
  const {
    scrollToHomeForm,
    setHomeData,
    localization,
    homeData,
  } = useStateContext();

  useEffect(() => {
    axios
      .get(`${API}/home-page?locale=${localization}`)
      .then((res) => {
        setHomeData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <MainScreen />
      <div className={cl.container}>
        <h1 className={cl.mainTitle}>
          {homeData?.attributes.spheresTitle}
        </h1>
        <Spheres />
        <VacancyList />
        <FAQ />
        <Partners />
      </div>
      <Testimonials />
      <div
        className={cl.container}
        ref={scrollToHomeForm}
      >
        <FeedbackForm />
      </div>
    </>
  );
};
