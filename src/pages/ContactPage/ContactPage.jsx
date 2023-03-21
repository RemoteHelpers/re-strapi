/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext } from '../../context/StateContext';

import memberTeam from '../../icons/team_member.png';
import { AboutPageSvg } from '../about/AboutPageSvg';
import Loader from '../../components/loader';
import FeedbackForm from '../../components/forms/feedbackForm';
// import ToTopButton from '../../components/toTopButton/ToTopButton';

import { API, PhotoAPI } from '../../constants';

import cl from './ContactPage.module.scss';

const ContactPage = () => {
  const { localization, scrollToTop } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/contact?locale=${localization === 'ua' ? 'uk' : localization}&populate=Recruiters.img`,
      )
      .then((res) => {
        setTeam(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [localization]);

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
        <div className="container">
          <div className={cl.our_team}>
            <h1>{team?.attributes.title}</h1>
            <p>{team?.attributes.description}</p>
            <div className={cl.team_cards}>
              {team.attributes.Recruiters.map((member) => (
                <div key={member.id} className={cl.team_card}>
                  <div className={cl.member_photo}>
                    <img
                      src={member.img.data?.attributes.url
                        ? PhotoAPI + member.img.data.attributes.url
                        : memberTeam}
                      alt={member.id}
                    />
                  </div>
                  <div className={cl.member_info}>
                    <h2>{member.name}</h2>
                    <span>Recruiter</span>
                    <div>
                      <AboutPageSvg id="telegram" />
                      <a
                        href={`https://t.me/${member.telegramNickname}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {member.telegramNickname}
                      </a>
                    </div>
                    <div>
                      <AboutPageSvg id="viber" />
                      <a
                        href={`viber://chat?number=${member.phoneNumber}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {member.phoneNumber}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={cl.form_wrapper}>
            <FeedbackForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ContactPage;
