/* eslint-disable react-hooks/exhaustive-deps */
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
import Loader from "../../components/loader";

import { API } from "../../constants";

export const HomePage = () => {
  const { setHomeData, localization, homeData, scrollToTop } =
    useStateContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/home-page?locale=${
          localization === "ua" ? "uk" : localization
        }&populate=Testimonials.personImg,Faq_Question,partnersSlider`
      )
      .then((res) => {
        setHomeData(res.data.data.attributes);
        // console.log(res.data.data.attributes);
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
              {homeData?.spheresTitle && (
                <div className={cl.spheres_wrapper}>
                  <h1 className={cl.mainTitle}>{homeData?.spheresTitle}</h1>
                  <Spheres />
                </div>
              )}
              <VacancyList isShowHot={true} />

              {homeData?.Faq_Question.length === 0 || (
                <div className={cl.faq_wrapper}>
                  <h2 className={cl.faq_title}>{homeData?.faqTitle}</h2>
                  <FAQ faqData={homeData?.Faq_Question} />
                </div>
              )}

              {homeData?.partnersSlider.data === null || <Partners />}
            </div>
            {homeData?.Testimonials.length === 0 || (
              <div className={cl.testimonials_wrapper}>
                <Testimonials />
              </div>
            )}
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
