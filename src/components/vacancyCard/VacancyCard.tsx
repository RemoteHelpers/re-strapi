import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "./vacancyCard.scss";
import FireIcon from "../../images/fireIcon.svg";
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
  const { setCurrentVacancy, localization, vacancyListData } =
    useStateContext();
  const handleSlug = () => {
    setCurrentVacancy(slug);
  };

  const routingRule = localization === "ru";

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
            <span className="VacancyCard__banner-text">
              {vacancyListData?.isHotValue}
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="VacancyCard__info">
          <h3 className="VacancyCard__title">{title}</h3>
          <p className="VacancyCard__salary">{vacancyListData?.salary}</p>
          {cardDescription ? (
            <ReactMarkdown
              children={`${cardDescription.slice(0, 107)}...`}
              className="VacancyCard__description"
            />
          ) : (
            ""
          )}
        </div>
        <button type="button" className="VacancyCard__button">
          {vacancyListData?.button}
        </button>

        {isHot ? (
          <div className="VacancyCard__banner VacancyCard__banner--desktop">
            <img src={FireIcon} className="VacancyCard__fireIcon" alt="icon" />
            <span className="VacancyCard__banner-text">
              {vacancyListData?.isHotValue}
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
    </Link>
  );
};

export default VacancyCard;
