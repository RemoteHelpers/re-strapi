/* eslint-disable padding-line-between-statements */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { useParams } from 'react-router-dom';
import '../../App.scss';
import cl from './vacancyDetails.module.scss';

export const VacancyDetails = () => {
  const params = useParams();
  return (
    <div className="container">
      <div className={cl.card}>
        {params.id}
      </div>
    </div>
  );
};
