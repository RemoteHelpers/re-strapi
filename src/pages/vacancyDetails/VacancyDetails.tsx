/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-console */
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

const API = "https://admin.r-ez.com/api";

const PhotoAPI = "https://admin.r-ez.com/";

export const VacancyDetails = () => {
  const { localization, scrollToTop } = useStateContext();
  const [localVacancy, setLocalVacancy] = useState<LocalVacancyType[]>([]);
  const [anotherVacancies, setAnotherVacancies] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [previewVideoImage, setPreviewVideoImage] = useState(true);
  const formSection = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any>();

  const { vacancyID } = useParams();

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
        // `${API}/vacancies?locale=${localization}&populate=*&filters[vacancySlug][$eq]=${vacancyID}`
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

  // useEffect(() => {
  //   setCurrentVacancy(vacancyID);
  // }, []);

  useEffect(() => {
    setPreviewVideoImage(true);
  }, [localVacancy]);

  const playVideo = () => {
    setPreviewVideoImage(false);
  };

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
                      <p>{data?.salary}</p>
                      <p>{localVacancyItem.attributes.subTitle}</p>
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
                      <button
                        type="button"
                        className={cl.shortVacancyVideo}
                        onClick={playVideo}
                      >
                        {/* {previewVideoImage ? (
                          <img
                            src={`${PhotoAPI}${localVacancyItem.attributes.videoPreview.data.attributes.url}`}
                            alt="video preview"
                          />
                        ) : ( */}
                        <ReactPlayer
                          className={cl.video_iframe}
                          url={localVacancyItem.attributes.videoLink}
                          controls
                        />
                        {/* )} */}
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
                Дивитися більше
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
