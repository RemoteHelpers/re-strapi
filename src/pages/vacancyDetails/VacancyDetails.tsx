/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
/* eslint-disable padding-line-between-statements */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import '../../App.scss';
import cl from './vacancyDetails.module.scss';
import { useStateContext } from '../../context/StateContext';
import { LocalVacancyType } from '../../types/types';

import play from '../../icons/play.png';
import { VacancyFireSvg } from './VacancyFireSvg';

const API = 'http://testseven.rh-s.com:1733/api';

export const VacancyDetails = () => {
  const { currentVacancy } = useStateContext();
  const [localVacancy, setLocalVacancy] = useState<LocalVacancyType[]>([]);

  useEffect(() => {
    axios.get(`${API}/vacancies?populate=*&filters[vacancySlug][$eq]=${currentVacancy}`)
      .then(res => {
        setLocalVacancy(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className={cl.card}>
        {localVacancy && (
          localVacancy.map(item => (
            <div key={item.id}>
              <span className={item.attributes.isHot ? cl.hotVacancy : cl.coldVacancy}>
                <VacancyFireSvg id="hot" />
                Гаряча
              </span>
              <div className={cl.shortVacancyWrapper}>
                <div className={cl.shortVacancyInfo}>
                  <h1>{item.attributes.title}</h1>
                  <p>Заробітна плата за результатами співбесіди</p>
                  <p>{item.attributes.subTitle}</p>
                  <a href="##">Відгукнутися</a>
                </div>
                <div className={cl.shortVacancyVideo}>
                  <img src={play} alt="" />
                </div>
              </div>
              <ReactMarkdown
                children={item.attributes.description}
                className={cl.cardContentWrapper}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
