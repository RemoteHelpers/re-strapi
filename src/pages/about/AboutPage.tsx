/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import cl from "./aboutPage.module.scss";
import kitekat from "../../icons/kitekat.png";
import FeedbackForm from "../../components/forms/feedbackForm";

import Spheres from "../../components/spheres";
// import aboutPreview from "../../images/aboutPage/about-preview.png";
import { ABOUT_PAGE } from "../../database/aboutPage";
import { useStateContext } from "../../context/StateContext";
import Loader from "../../components/loader";

export const AboutPage = () => {
  const { localization } = useStateContext();
  // const [previewVideoImage, setPreviewVideoImage] = useState(true);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const res = ABOUT_PAGE.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  // const playVideo = () => {
  //   setPreviewVideoImage(false);
  // };

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
                <h1>{data?.title}</h1>
                <p>{data?.titleDescription}</p>
                <button
                  type="button"
                  className={cl.video_intro}
                  // onClick={playVideo}
                >
                  {/* {previewVideoImage ? (
                    <img src={aboutPreview} alt="video about us" />
                  ) : ( */}
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=WWqF-1vRSRk"
                    className={cl.video_iframe}
                    controls
                  />
                  {/* )} */}
                </button>
              </div>
              <div className={cl.intro_kitekat}>
                <img src={kitekat} alt="cat" />
              </div>
            </div>
            <div className={cl.what_we_do}>
              <h1>{data?.title2}</h1>
              <p>{data?.title2Description}</p>
              <Spheres />
            </div>
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
