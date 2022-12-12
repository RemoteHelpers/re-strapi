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

import memberTeam from "../../icons/team_member.png";
import { AboutPageSvg } from "./AboutPageSvg";
import Spheres from "../../components/spheres";
import aboutPreview from "../../images/aboutPage/about-preview.png";
import { ABOUT_PAGE } from "../../database/aboutPage";
import { useStateContext } from "../../context/StateContext";

export const AboutPage = () => {
  const { localization } = useStateContext();
  const [previewVideoImage, setPreviewVideoImage] = useState(true);
  const [data, setData] = useState<any>();

  useEffect(() => {
    const res = ABOUT_PAGE.filter(el => (el.language === localization));

    setData(res[0]);
    console.log(data);
  }, [localization]);

  const playVideo = () => {
    setPreviewVideoImage(false);
  };

  useEffect(() => {
    document.title = "Remote Employees";
  }, []);

  return (
    <>
      <section className={cl.section}>
        <div className={cl.container}>
          <div className={cl.intro_wrapper}>
            <div className={cl.into_information}>
              <h1>{data?.title}</h1>
              <p>
                {data?.titleDescription}
              </p>
              <button
                type="button"
                className={cl.video_intro}
                onClick={playVideo}
              >
                {previewVideoImage ? (
                  <img src={aboutPreview} alt="video about us" />
                ) : (
                  <ReactPlayer
                    url="https://www.youtube.com/watch?v=WWqF-1vRSRk"
                    className={cl.video_iframe}
                    controls
                    playing
                  />
                )}
              </button>
            </div>
            <div className={cl.intro_kitekat}>
              <img src={kitekat} alt="cat" />
            </div>
          </div>
          <div className={cl.what_we_do}>
            <h1>{data?.title2}</h1>
            <p>
              {data?.title2Description}
            </p>
            <Spheres />
          </div>

          <div className={cl.our_team}>
            <h1>{data?.titleTeam}</h1>
            <p>
              {data?.teamDescription}
            </p>
            <div className={cl.team_cards}>
              {data?.team.map((member: any) => (
                <div key={member.id} className={cl.team_card}>
                  <div className={cl.member_photo}>
                    <img src={memberTeam} alt="team member" />
                  </div>
                  <div className={cl.member_info}>
                    <h2>{member.name}</h2>
                    <span>{member.position}</span>
                    <div>
                      <AboutPageSvg id="telegram" />
                      <span>{member.email}</span>
                    </div>
                    <div>
                      <AboutPageSvg id="viber" />
                      <span>{member.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cl.footer_decoration}>
            <div className={cl.form_wrapper}>
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
