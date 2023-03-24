/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import ReactPlayer from "react-player/youtube";
import kitekat from "../../icons/kitekat.png";
import FeedbackForm from "../../components/forms/feedbackForm";

import Spheres from "../../components/spheres";
import { useStateContext } from "../../context/StateContext";
import Loader from "../../components/loader";

import cl from "./aboutPage.module.scss";

import { API } from "../../constants";

export const AboutPage = () => {
  const { localization, scrollToTop } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [aboutData, setAboutData] = useState<any>([]);

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/about-us?locale=${localization === "ua" ? "uk" : localization}`
      )
      .then((res) => {
        setAboutData(res.data.data.attributes);
        // console.log(res.data.data.attributes);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [localization]);

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
        <section className={cl.section}>
          <div className={cl.container}>
            <div className={cl.intro_wrapper}>
              <div className={cl.into_information}>
                <h1>{aboutData?.title}</h1>
                <ReactMarkdown children={aboutData?.firstDescription} />
                {aboutData?.videoUrl && (
                  <button type="button" className={cl.video_intro}>
                    <ReactPlayer
                      url={aboutData?.videoUrl}
                      className={cl.video_iframe}
                      controls
                    />
                  </button>
                )}
              </div>
              <div className={cl.intro_kitekat}>
                <img src={kitekat} alt="cat" />
              </div>
            </div>
            {aboutData?.WhatWeDoTitle && (
              <div className={cl.what_we_do}>
                <h1>{aboutData?.WhatWeDoTitle}</h1>
                <ReactMarkdown children={aboutData?.SecondDescription} />
                <Spheres />
              </div>
            )}
            <div className={cl.footer_decoration}>
              <div className={cl.form_wrapper}>
                <FeedbackForm />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
