/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Link } from "react-router-dom";
import "./vacancyCard.scss";
import FireIcon from "../../images/fireIcon.svg";
import { useStateContext } from "../../context/StateContext";

interface Props {
  title: string;
  slug: string;
  isHot: string;
}

const VacancyCard: React.FC<Props> = ({ title, slug, isHot }) => {
  const { setCurrentVacancy, localization } = useStateContext();
  const handleSlug = () => {
    setCurrentVacancy(slug);
  };

  return (
    <Link to={`/${localization}/vacancies/${slug}`} onClick={handleSlug}>
      <div className="VacancyCard">
        <div className="VacancyCard__banner VacancyCard__banner--mobile">
          <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
          <span className="VacancyCard__banner-text">
            {isHot ? "Urgent" : "Not urgent"}
          </span>
        </div>

        <div className="VacancyCard__info">
          <h3 className="VacancyCard__title">{title}</h3>
          <p className="VacancyCard__salary">
            Salary based on interview results
          </p>
          <p className="VacancyCard__description">
            Our company is in search of a lead generator who will search for new
            customers and information on the Internet, work with social
            networks.
          </p>
        </div>
        <button type="button" className="VacancyCard__button">
          See more
        </button>

        <div className="VacancyCard__banner VacancyCard__banner--desktop">
          <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
          <span className="VacancyCard__banner-text">Urgent</span>
        </div>
      </div>
    </Link>
  );
};

export default VacancyCard;