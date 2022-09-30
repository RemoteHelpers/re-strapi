/* eslint-disable max-len */
/* eslint-disable padding-line-between-statements */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../App.scss';
import cl from './vacancyDetails.module.scss';
import { vacancyTypes } from '../../types/types';

const API = 'http://testseven.rh-s.com:1733/api';

export const VacancyDetails = () => {
  const params = useParams();
  const [responseState, setResponseState] = useState([]);

  useEffect(() => {
    axios.get(`${API}/vacancies?populate=*`)
      .then(res => {
        const resData = res.data.data;

        setResponseState(resData);
        console.log(resData);

        const slugResult = resData.find((resItem: {
          attributes: any; vacancySlug: string | any;
        }) => resItem.attributes.vacancySlug === params.currentVacancy);
        console.log(slugResult);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <div className={cl.card}>
        {responseState.map((vacancy: vacancyTypes) => (
          <div key={vacancy.id}>
            <h1>{vacancy.attributes.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

// {params.currentVacancy}
// {params.id}
