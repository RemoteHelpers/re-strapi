/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from 'axios';
import ReactPlayer from "react-player/youtube";

import cl from "./videoInterview.module.scss";
import "../../global-styles/colors.scss";
import FeedbackForm from "../../components/forms/feedbackForm";
import { useStateContext } from "../../context/StateContext";
import FAQ from "../../components/faq";
import Loader from "../../components/loader";

import { API, PhotoAPI } from "../../constants";

export const VideoInterview = () => {
  const { localization } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [videoData, setVideoData] = useState<any>([]);

  useEffect(() => {
    axios
      .get(
        `${API}/videointerview?locale=${localization === "ua" ? "uk" : localization}&populate=*`
      )
      .then((res) => {
        setVideoData(res.data.data.attributes);
        console.log(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
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
          <div className={cl.main_screen}>
            <div className={cl.container}>
              <div className={cl.main_wrapper}>
                <div className={cl.top_intro}>
                  <div className={cl.interview_tv}>
                    <img src={PhotoAPI + videoData?.firstCat.data?.attributes.url} alt="camera cat" />
                  </div>
                  <div className={cl.top_intro_text}>
                    <h1>{videoData?.title}</h1>
                    <ReactMarkdown children={videoData?.firstDescription} />
                  </div>
                </div>
                <div className={cl.bottom_intro}>
                  <div className={cl.bottom_intro_text}>
                    <ReactMarkdown children={videoData?.secondDescription} />
                  </div>
                  <div className={cl.absoluted_interview_cat}>
                    <img src={PhotoAPI + videoData?.secondCat.data?.attributes.url} alt="interview cat" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cl.instruction}>
            <div className={cl.container}>
              <div className={cl.instruction_wrapper}>
                <h2 className={cl.instruction_title}>
                  {videoData?.videoFaqTitle}
                </h2>
                <FAQ faqData={videoData?.videointerview_faq} />
              </div>
            </div>
          </div>
          <div className={cl.container}>
            <div className={cl.video_block}>
              <div className={cl.video_instruction_block}>
                <button
                  type="button"
                  id="instruction"
                  className={cl.instruction_video_title}
                >
                  <ReactPlayer
                    className={cl.video_iframe}
                    url={videoData?.firstVideo}
                    controls
                  />
                </button>
                <div className={cl.video_instruction}>
                  <h1>{videoData?.secondTitle}</h1>
                  <ReactMarkdown children={videoData?.thirdDescription} />
                </div>
              </div>

              <div className={cl.video_examples}>
                <h1>{videoData?.thirdTitle}</h1>
                <div className={cl.video_examples_wrapper}>
                  {videoData?.videoList.map((videoItem: any) => (
                    <button
                      type="button"
                      id={`${videoItem.id}`}
                      key={videoItem.id}
                      className={cl.instruction_video_title}
                    >
                      <ReactPlayer
                        className={cl.video_iframe}
                        url={videoItem.videoLink}
                        controls
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={cl.form_wrapper}>
              <FeedbackForm />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
