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
import { Alert, Breadcrumbs, Link, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useParams } from "react-router";
import cl from "./vacancyDetails.module.scss";
import { useStateContext } from "../../context/StateContext";
import { LocalVacancyType } from "../../types/types";

import play from "../../icons/play.png";
import { VacancySvg } from "./VacancyFireSvg";
import VacancyForm from "../../components/forms/vacancyForm";
import ToTopButton from "../../components/toTopButton/ToTopButton";

const API = "http://testseven.rh-s.com:1733/api";

export const VacancyDetails = () => {
  const { localization } = useStateContext();
  const [localVacancy, setLocalVacancy] = useState<LocalVacancyType[]>([]);
  const [activeAlert, setActiveAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formSection = useRef<HTMLDivElement>(null);
  const { vacancyID } = useParams();

  useEffect(() => {
    axios
      .get(
        `${API}/vacancies?populate=*&filters[vacancySlug][$eq]=${vacancyID}`
        // `${API}/vacancies?locale=${localization}&populate=*&filters[vacancySlug][$eq]=${vacancyID}`
      )
      .then((res) => {
        setLocalVacancy(res.data.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   setCurrentVacancy(vacancyID);
  // }, []);

  const handleClickToFavorite = () => {
    setActiveAlert(true);
    setTimeout(() => {
      setActiveAlert(false);
    }, 3000);
  };

  return (
    <div className="container">
      {!isLoading ?
        <div className={cl.card}>
          {localVacancy &&
            localVacancy.map((item) => (
              <div key={item.id}>
                <div className={cl.headerCard}>
                  <Breadcrumbs
                    separator={
                      <NavigateNextIcon
                        className={cl.crumbArrow}
                        fontSize="medium"
                      />
                    }
                    aria-label="breadcrumb"
                  >
                    <Link
                      className={`${cl.normalCrumb} ${cl.firstCrumb}`}
                      underline="none"
                      color="inherit"
                      href="/"
                    >
                      Головна
                    </Link>
                    <Link
                      className={cl.normalCrumb}
                      underline="none"
                      color="inherit"
                      href={`/${localization}/vacancies`}
                    >
                      Vacancies
                    </Link>
                    <Typography className={cl.activeCrumb}>
                      {item.attributes.title}
                    </Typography>
                  </Breadcrumbs>
                  <button
                    type="button"
                    onClick={handleClickToFavorite}
                    className={cl.addToFavorite}
                  >
                    <span className={cl.favoriteTitle}>Додати у закладки</span>
                    <VacancySvg id="star" />
                  </button>
                  {activeAlert && (
                    <div className={cl.alertWrapper}>
                      <Alert variant="filled" severity="warning">
                        Для того щоб додати сторінку в закладки, натисніть Ctrl +
                        D
                      </Alert>
                    </div>
                  )}
                </div>
                <span
                  className={
                    item.attributes.isHot ? cl.hotVacancy : cl.coldVacancy
                  }
                >
                  <VacancySvg id="hot" />
                  Гаряча
                </span>
                <div className={cl.shortVacancyWrapper}>
                  <div className={cl.shortVacancyInfo}>
                    <h1>{item.attributes.title}</h1>
                    <p>Заробітна плата за результатами співбесіди</p>
                    <p>{item.attributes.subTitle}</p>
                    <button
                      type="button"
                      onClick={() =>
                        formSection?.current?.scrollIntoView({
                          block: "center",
                          behavior: "smooth",
                        })
                      }
                    >
                      Відгукнутися
                    </button>
                  </div>
                  <div className={cl.shortVacancyVideo}>
                    <img src={play} alt="" />
                  </div>
                </div>
                <ReactMarkdown
                  children={item.attributes.description}
                  className={cl.cardContentWrapper}
                />
              </div>
            ))}

          <div className={cl.vacancyForm}>
            {localVacancy.map((form) => (
              <div key={form.id}>
                <ReactMarkdown
                  children={form.attributes.formTitle}
                  className={cl.formStyledMarkdown}
                />
                <div ref={formSection}>
                  <VacancyForm />
                </div>
              </div>
            ))}
          </div>
        </div>
        : (
          <div className="loading">
            <div className="lds-roller">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )
      }
      <div className={cl.vacancy_top}>
        <ToTopButton />
      </div>
    </div>
  );
};
