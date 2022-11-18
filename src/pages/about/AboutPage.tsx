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

export const AboutPage = () => {
  const [previewVideoImage, setPreviewVideoImage] = useState(true);

  const team = [
    {
      id: 1,
      name: "Марія",
      position: "Recruiter",
      email: "@MashaRemotEmployees",
      phone: "+380987286405",
    },
    {
      id: 2,
      name: "Ольга",
      position: "Recruiter",
      email: "@RemoteEmployeesOlha",
      phone: "+380995664454",
    },
    {
      id: 3,
      name: "Марія",
      position: "Recruiter",
      email: "@MashaRemotEmployees",
      phone: "+380987286405",
    },
    {
      id: 4,
      name: "Марія",
      position: "Recruiter",
      email: "@MashaRemotEmployees",
      phone: "+380987286405",
    },
    {
      id: 5,
      name: "Ольга",
      position: "Recruiter",
      email: "@RemoteEmployeesOlha",
      phone: "+380995664454",
    },
    {
      id: 6,
      name: "Марія",
      position: "Recruiter",
      email: "@MashaRemotEmployees",
      phone: "+380987286405",
    },
  ];

  const playVideo = () => {
    setPreviewVideoImage(false);
  };

  useEffect(() => {
    document.title = "Про нас";
  }, []);

  return (
    <>
      <section className={cl.section}>
        <div className={cl.container}>
          <div className={cl.intro_wrapper}>
            <div className={cl.into_information}>
              <h1>RemotEmployees - Аутстафінгова компанія</h1>
              <p>
                Ми надаємо робочі місця в Україні, орієнтуючись на Європейський
                та Американський ринок. Співпраця з нашою компанією дозволить
                вам набути нових умінь у сфері IT та маркетингу, a також
                розвинути навички спілкування з носіями іноземної мови.
              </p>
              <p>
                Наша компанія вже понад три роки надає послуги в галузі IT
                технологій та маркетингу. Ми співпрацюємо з компаніями з усього
                світу та підтримуємо позитивну репутацію на західному ринку
                праці.
              </p>
              <button
                type="button"
                className={cl.video_intro}
                onClick={playVideo}
              >
                {previewVideoImage ? (
                  <img src={aboutPreview} alt="" />
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
              <img src={kitekat} alt="" />
            </div>
          </div>
          <div className={cl.what_we_do}>
            <h1>Чим ми займаємося?</h1>
            <p>
              Ми працюємо за трьома основними напрямками, які включають багато
              спеціальностей.
            </p>
            <p>
              Можливо, Ви не маєте досвіду роботи, тільки закінчили навчальний
              заклад і поки не знаєте, де застосувати свої знання та навички. Ми
              готові надати вам можливість отримати роботу і освоїти нову
              спеціальність.
            </p>
            <Spheres />
          </div>

          <div className={cl.our_team}>
            <h1>Наша команда</h1>
            <p>
              Ми допоможемо Вам адаптуватися до роботи у нашій команді та
              познайомимо з колективом.
            </p>
            <div className={cl.team_cards}>
              {team.map((member) => (
                <div key={member.id} className={cl.team_card}>
                  <div className={cl.member_photo}>
                    <img src={memberTeam} alt="" />
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
