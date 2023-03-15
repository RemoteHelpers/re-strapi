/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./vacancyCard.scss";
import FireIcon from "../../images/fireIcon.svg";
import { VACANCYLIST } from "../../database/common/vacancyList";
import { useStateContext } from "../../context/StateContext";

interface Props {
  title: string;
  slug: string;
  isHot: boolean;
  cardDescription: string;
  categorySlug: string;
}

const VacancyCard: React.FC<Props> = ({
  title,
  slug,
  isHot,
  cardDescription,
  categorySlug,
}) => {
  const {
    setCurrentVacancy,
    localization,
  } = useStateContext();
  const [data, setData] = useState<any>();
  const handleSlug = () => {
    setCurrentVacancy(slug);
  };

  const routingRule = localization === "ru";

  useEffect(() => {
    const res = VACANCYLIST.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  return (
    <Link
      to={
        routingRule
          ? `/${categorySlug}/${slug}`
          : `/${localization}/${categorySlug}/${slug}`
      }
      onClick={handleSlug}
    >
      <div className="VacancyCard">
        {isHot ? (
          <div className="VacancyCard__banner VacancyCard__banner--mobile">
            <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
            <span className="VacancyCard__banner-text">Urgent</span>
          </div>
        ) : (
          ""
        )}
        <div className="VacancyCard__info">
          <h3 className="VacancyCard__title">{title}</h3>
          <p className="VacancyCard__salary">{data?.salary}</p>
          {cardDescription
            // eslint-disable-next-line react/no-children-prop
            ? <ReactMarkdown children={`${cardDescription.slice(0, 107)}...`} className="VacancyCard__description" />
            : ''}
        </div>
        <button type="button" className="VacancyCard__button">
          {data?.button}
        </button>

        {isHot ? (
          <div className="VacancyCard__banner VacancyCard__banner--desktop">
            <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
            <span className="VacancyCard__banner-text">Urgent</span>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default VacancyCard;
