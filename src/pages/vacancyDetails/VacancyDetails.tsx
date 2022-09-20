/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { useParams } from 'react-router-dom';
import '../../App.scss';
import cl from './vacancyDetails.module.scss';

export const VacancyDetails = () => {
  const valueParams = useParams();

  return (
    <div className="container">
      <div className={cl.card}>
        <h1>{valueParams.title}</h1>
        <div><strong>ID:</strong> {valueParams.id}</div>
      </div>
    </div>
  );
};
