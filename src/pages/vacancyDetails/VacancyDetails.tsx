/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../../App.scss";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams, Link as RouterLink } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { useStateContext } from "../../context/StateContext";
import { LocalVacancyType } from "../../types/types";

import { VacancySvg } from "./VacancyFireSvg";
import VacancyForm from "../../components/forms/vacancyForm";
import Loader from "../../components/loader";
import ToTopButton from "../../components/toTopButton/ToTopButton";
import cl from "./vacancyDetails.module.scss";
import VacancyCard from "../../components/vacancyCard";
import { VACANCY_DETAILS } from "../../database/vacancyDetailsPage";

import { API } from "../../constants";
import NotFoundPage from "../notFoundPage/notFoundPage";

export const VacancyDetails = () => {
  const { localization, scrollToTop, headerData } = useStateContext();
  const [localVacancy, setLocalVacancy] = useState<LocalVacancyType[]>([]);
  const [anotherVacancies, setAnotherVacancies] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const formSection = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>();
  const [errorReq, setErrorReq] = useState(false);

  const { categoryID, vacancyID } = useParams();

  const routingRule = localization === "ru";

  useEffect(() => {
    const res = VACANCY_DETAILS.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/vacancies?populate=*&locale=${
          localization === "ua" ? "uk" : localization
        }&filters[vacancySlug][$eq]=${vacancyID}`
      )
      .then((res) => {
        setIsLoading(true);
        setLocalVacancy(res.data.data);
        setCurrentCategory(
          res.data.data[0].attributes.categories.data[0].attributes
            .categoryTitle
        );
        document.title = res.data.data[0].attributes.title;
        // console.log(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        setErrorReq(true);
        console.log(err);
      });
  }, [vacancyID]);

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, [localVacancy]);

  useEffect(() => {
    axios
      .get(
        `${API}/vacancies?populate=*&locale=${
          localization === "ua" ? "uk" : localization
        }&filters[categories][categoryTitle][$contains]=${currentCategory}`
      )
      .then((res) => {
        setAnotherVacancies(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentCategory, vacancyID]);

  if (errorReq) {
    console.log("нема такого");

    return <NotFoundPage />;
  }

  return (
    <div className={cl.container}>
      {!isLoading ? (
        <div>
          <div className={cl.card}>
            {localVacancy &&
              localVacancy.map((localVacancyItem) => (
                <div key={localVacancyItem.id}>
                  <div className={cl.headerCard}>
                    <Breadcrumbs
                      separator={
                        <NavigateNextIcon
                          className={cl.crumbArrow}
                          fontSize="medium"
                        />
                      }
                      className={cl.breadCrumbArrows}
                      aria-label="breadcrumb"
                    >
                      <Link
                        className={`${cl.normalCrumb} ${cl.firstCrumb}`}
                        underline="none"
                        color="inherit"
                        href={routingRule ? "/" : `/${localization}`}
                      >
                        {data?.homeLink}
                      </Link>
                      <Link
                        className={cl.normalCrumb}
                        underline="none"
                        color="inherit"
                        href={
                          routingRule
                            ? "/vacancies"
                            : `/${localization}/vacancies`
                        }
                      >
                        {data?.vacanciesLink}
                      </Link>
                      <Link
                        className={cl.normalCrumb}
                        underline="none"
                        color="inherit"
                        href={
                          routingRule
                            ? `/${categoryID}`
                            : `/${localization}/${categoryID}`
                        }
                      >
                        {
                          localVacancyItem.attributes.categories.data[0]
                            .attributes.categoryTitle
                        }
                      </Link>
                      <Typography className={cl.activeCrumb}>
                        {localVacancyItem.attributes.title}
                      </Typography>
                    </Breadcrumbs>
                  </div>
                  <span
                    className={
                      localVacancyItem.attributes.isHot
                        ? cl.hotVacancy
                        : cl.coldVacancy
                    }
                  >
                    <VacancySvg id="hot" />
                    {data?.ishot}
                  </span>
                  <div className={cl.shortVacancyWrapper}>
                    <div className={cl.shortVacancyInfo}>
                      <h1>{localVacancyItem.attributes.titleH1}</h1>
                      {/* <p>{data?.salary}</p> */}
                      <p>{localVacancyItem.attributes.subTitle}</p>
                      <ReactMarkdown
                        children={localVacancyItem.attributes.cardDescription}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          formSection?.current?.scrollIntoView({
                            block: "start",
                            behavior: "smooth",
                          })
                        }
                      >
                        {data?.mainButton}
                      </button>
                    </div>
                    {localVacancyItem.attributes.videoLink ? (
                      <button type="button" className={cl.shortVacancyVideo}>
                        <ReactPlayer
                          className={cl.video_iframe}
                          url={localVacancyItem.attributes.videoLink}
                          controls
                        />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <ReactMarkdown
                    children={localVacancyItem.attributes.description}
                    className={cl.cardContentWrapper}
                  />
                </div>
              ))}

            <div ref={formSection}></div>
            <div className={cl.vacancyForm}>
              {localVacancy.map((form) => (
                <div key={form.id}>
                  <ReactMarkdown
                    children={form.attributes.formTitle}
                    className={cl.formStyledMarkdown}
                  />
                  <VacancyForm />
                </div>
              ))}
            </div>
          </div>
          <div className={cl.another_vacancies}>
            <h2>{data?.similarTitle}</h2>
            <div className={cl.fetching_another_vacancies}>
              {anotherVacancies.slice(0, 3).map((anotherVacancy: any) => (
                <div key={anotherVacancy.id}>
                  {anotherVacancy.attributes.vacancySlug !== vacancyID && (
                    <VacancyCard
                      title={anotherVacancy.attributes.title}
                      slug={anotherVacancy.attributes.vacancySlug}
                      isHot={anotherVacancy.attributes.isHot}
                      cardDescription={
                        anotherVacancy.attributes.cardDescription
                      }
                      categorySlug={
                        anotherVacancy.attributes.categories.data[0].attributes
                          .categorySlug
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5rem",
              }}
            >
              <RouterLink
                to={
                  localization === "ru"
                    ? `/vacancies`
                    : `/${localization}/vacancies`
                }
                className={cl.see_more}
              >
                {headerData?.seeMore}
              </RouterLink>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <div className={cl.toTopButton}>
        <ToTopButton />
      </div>
    </div>
  );
};
