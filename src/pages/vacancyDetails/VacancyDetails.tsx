/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
import React from 'react';
import { useParams } from 'react-router-dom';

export const VacancyDetails = () => {
  const valueParams = useParams();

  return (
    <div>
      <div><strong>Vacancy:</strong> {valueParams.title}</div>
      <div><strong>ID:</strong> {valueParams.id}</div>
    </div>
  );
};
