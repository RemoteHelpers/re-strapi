/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import './VacancyCard.scss';
import FireIcon from '../../images/fireIcon.svg';

interface Props {
  title: string,
  currentVacancy: string
}

const VacancyCard: React.FC<Props> = ({ title, currentVacancy }) => {
  return (
    <div className="VacancyCard">
      <div className="VacancyCard__banner VacancyCard__banner--mobile">
        <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
        <span className="VacancyCard__banner-text">Urgent</span>
      </div>

      <div className="VacancyCard__info">
        <h3 className="VacancyCard__title">{title}</h3>
        <p className="VacancyCard__salary">Salary based on interview results</p>
        <p className="VacancyCard__description">
          Our company is in search of a lead generator who will search for new customers
          and information on the Internet, work with social networks.
        </p>
      </div>
      <Link
        className="VacancyCard__button"
        to={`/vacancies/${currentVacancy}`}
      >
        See more
      </Link>

      <div className="VacancyCard__banner VacancyCard__banner--desktop">
        <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
        <span className="VacancyCard__banner-text">Urgent</span>
      </div>
    </div>
  );
};

export default VacancyCard;
