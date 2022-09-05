import React from 'react';
import './VacancyCard.scss';
import FireIcon from '../../images/fireIcon.svg';

interface Props {
  title: string,
}

const VacancyCard:React.FC<Props> = ({ title }) => {
  return (
    <div className="VacancyCard">
      <div className="VacancyCard__info">
        <h3 className="VacancyCard__title">{title}</h3>
        <p className="VacancyCard__salary">Salary based on interview results</p>
        <p className="VacancyCard__description">
          Our company is in search of a lead generator who will search for new customers
          and information on the Internet, work with social networks.
        </p>
      </div>

      <button
        className="VacancyCard__button"
        type="button"
      >
        See more
      </button>

      <div className="VacancyCard__banner">
        <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
        <span className="VacancyCard__banner-text">Urgent</span>
      </div>
    </div>
  );
};

export default VacancyCard;
