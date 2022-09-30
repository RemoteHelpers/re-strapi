import React from 'react';
import './vacancyCard.scss';
import FireIcon from '../../images/fireIcon.svg';

interface Props {
  title: string,
  subTitle: string,
  isHot: boolean,
}

const VacancyCard:React.FC<Props> = ({ title, subTitle, isHot }) => {
  return (
    <div className="VacancyCard">
      {isHot && (
        <div className="VacancyCard__banner VacancyCard__banner--mobile">
          <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
          <span className="VacancyCard__banner-text">Urgent</span>
        </div>
      )}

      <div className="VacancyCard__info">
        <h3 className="VacancyCard__title">{title}</h3>
        <p className="VacancyCard__salary">Salary based on interview results</p>
        <p className="VacancyCard__description">
          {subTitle}
        </p>
      </div>

      <button
        className="VacancyCard__button"
        type="button"
      >
        See more
      </button>

      {isHot && (
        <div className="VacancyCard__banner VacancyCard__banner--desktop">
          <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
          <span className="VacancyCard__banner-text">Urgent</span>
        </div>
      )}
    </div>
  );
};

export default VacancyCard;
