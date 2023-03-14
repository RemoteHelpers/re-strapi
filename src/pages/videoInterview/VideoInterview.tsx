/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player/youtube";

import cl from "./videoInterview.module.scss";
import "../../global-styles/colors.scss";
import cameraKitekat from "../../icons/kitekat_camera.png";
import FeedbackForm from "../../components/forms/feedbackForm";
// import { ArrowSvg } from "./ArrowSvg";
import interviewCat from "../../icons/interview_kitekat.png";
// import interviewPreview from "../../images/videoInterviewPage/interview-preview.png";
import { useStateContext } from "../../context/StateContext";
import { VIDEOINTERVIEW_PAGE } from "../../database/videointerview_page";
import FAQ from "../../components/faq";
import Loader from "../../components/loader";

export const VideoInterview = () => {
  // const [previewVideoImage, setPreviewVideoImage] = useState(null);
  const { localization } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);

  const localizedVideoInterviewData = VIDEOINTERVIEW_PAGE.find(
    (el) => el.language === localization
  )?.data;

  const localizedVideoInterviewFAQData = VIDEOINTERVIEW_PAGE.find(
    (el) => el.language === localization
  )?.data.faq_section;

  const videoExamples = [
    {
      id: 1,
      url: "https://www.youtube.com/watch?v=aOizaicAE3g",
    },
    {
      id: 2,
      url: "https://www.youtube.com/watch?v=nxV_VLLn1V8",
    },
    {
      id: 3,
      url: "https://www.youtube.com/watch?v=SHJKtqARfQc",
    },
  ];

  // const playVideo = (event: any) => {
  //   setPreviewVideoImage(event.currentTarget.id);
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
          <div className={cl.main_screen}>
            <div className={cl.container}>
              <div className={cl.main_wrapper}>
                <div className={cl.top_intro}>
                  <div className={cl.interview_tv}>
                    <img src={cameraKitekat} alt="camera cat" />
                  </div>
                  <div className={cl.top_intro_text}>
                    <h1>{localizedVideoInterviewData?.title}</h1>
                    <p>{localizedVideoInterviewData?.subtitle}</p>
                  </div>
                </div>
                <div className={cl.bottom_intro}>
                  <div className={cl.bottom_intro_text}>
                    <p>{localizedVideoInterviewData?.intro_text}</p>
                  </div>
                  <div className={cl.absoluted_interview_cat}>
                    <img src={interviewCat} alt="interview cat" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cl.instruction}>
            <div className={cl.container}>
              <div className={cl.instruction_wrapper}>
                <h2 className={cl.instruction_title}>
                  {localizedVideoInterviewFAQData?.title}
                </h2>
                <FAQ localizedData={localizedVideoInterviewFAQData} />
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
                  // onClick={playVideo}
                >
                  {/* {previewVideoImage !== "instruction" ? (
                    <img src={interviewPreview} alt="interview preview" />
                  ) : ( */}
                  <ReactPlayer
                    className={cl.video_iframe}
                    url="https://www.youtube.com/watch?v=1PRGzaUIvGM"
                    controls
                  />
                  {/* )} */}
                </button>
                <div className={cl.video_instruction}>
                  <h1>{localizedVideoInterviewData?.instruction_title}</h1>
                  <p>{localizedVideoInterviewData?.instruction_description}</p>
                </div>
              </div>

              <div className={cl.video_examples}>
                <h1>{localizedVideoInterviewData?.examples_title}</h1>
                <div className={cl.video_examples_wrapper}>
                  {videoExamples.map((videoItem) => (
                    <button
                      type="button"
                      id={`${videoItem.id}`}
                      key={videoItem.id}
                      className={cl.instruction_video_title}
                      // onClick={playVideo}
                    >
                      {/* {previewVideoImage !== `${videoItem.id}` ? (
                        <img src={interviewPreview} alt="interview preview" />
                      ) : ( */}
                      <ReactPlayer
                        className={cl.video_iframe}
                        url={videoItem.url}
                        controls
                      />
                      {/* )} */}
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
