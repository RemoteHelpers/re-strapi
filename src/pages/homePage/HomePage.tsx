/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from "react";
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
import { HOME_PAGE } from "../../database/home_page";
import Loader from "../../components/loader";

const API = "https://admin.r-ez.com/api";

export const HomePage = () => {
  const { setHomeData, localization } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);

  const localizadSpheresData = HOME_PAGE.find(
    (el) => el.language === localization
  )?.data.spheres_section;

  const localizedHomePageFAQData = HOME_PAGE.find(
    (el) => el.language === localization
  )?.data.faq_section;

  useEffect(() => {
    axios
      .get(
        `${API}/home-page?locale=${localization === "ua" ? "uk" : localization}`
      )
      .then((res) => {
        setHomeData(res.data.data);
        // console.log(res.data.data);
      })
      .catch(() => {
        // console.log(err);
      });
  }, []);

  useEffect(() => {
    document.title = "Remote Employees";
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MainScreen />
          <div className={cl.container}>
            <div className={cl.content_wrapper}>
              <div className={cl.spheres_wrapper}>
                <h1 className={cl.mainTitle}>{localizadSpheresData?.title}</h1>
                <Spheres />
              </div>
              <VacancyList />
              <div className={cl.faq_wrapper}>
                <h2 className={cl.faq_title}>
                  {localizedHomePageFAQData?.title}
                </h2>
                <FAQ localizedData={localizedHomePageFAQData} />
              </div>

              <Partners />
            </div>
            <div className={cl.testimonials_wrapper}>
              <Testimonials />
            </div>
            <div className={cl.content_wrapper}>
              <div className={cl.form_wrapper}>
                <FeedbackForm />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
