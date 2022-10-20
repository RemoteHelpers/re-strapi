import React from 'react';
import FormFields from '../../formFields';
import cl from './vacancyForm.module.scss';
import vacancyCat from '../../../icons/vacancyCat.png';

export const VacancyForm = () => {
  return (
    <div className={cl.wrapper}>
      <FormFields />
      <div>
        <img src={vacancyCat} alt="Vacancy Cat" />
      </div>
    </div>
  );
};
