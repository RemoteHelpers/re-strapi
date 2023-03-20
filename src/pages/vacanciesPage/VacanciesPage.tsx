/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
/* eslint-disable padding-line-between-statements */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-indent */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { useWindowWidth } from "@react-hook/window-size";
import "./Vacancies.scss";
import "../../global-styles/search.scss";
import axios from "axios";
import { Category, Vacancy, Collection, VacancyArray } from "../../types/types";

import useOutsideAlerter from "../../hooks/useClickOutside";

import FeedbackForm from "../../components/forms/feedbackForm";
import VacanciesList from "../../components/vacanciesList";
import { useStateContext } from "../../context/StateContext";
import Loader from "../../components/loader";
import { API, PhotoAPI } from "../../constants";

const itemsPerPage = 10;

let vacationTime: any;

export const VacaniesPage = () => {
  useEffect(() => {
    document.title = "Remote Employees";
  }, []);

  const { localization, scrollToTop } = useStateContext();

  const searchRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [vacancies, setVacancies] = useState<VacancyArray[]>([]);
  const [currentVacancy, setCurrentVacancy] = useState<string>("");
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [vacancyData, setVacancyData] = useState<any>();

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/vacancy-page?locale=${localization === "ua" ? "uk" : localization}&populate=*`
      )
      .then((res) => {
        setVacancyData(res.data.data.attributes);
        // console.log(res.data.data.attributes);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [localization]);

  useOutsideAlerter(searchRef, () => {
    setIsDropdown(false);
  });

  useEffect(() => {
    axios
      .get(`${API}/categories`)
      .then((res) => {
        setCategories(res.data.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/vacancies?populate=*`)
      .then((res) => {
        setVacancies(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    clearTimeout(vacationTime);
    vacationTime = setTimeout(async () => {
      let queryFilters = "";

      if (currentCategory) {
        queryFilters += `&filters[categories][categoryTitle][$contains]=${currentCategory}`;
      }

      if (query.length > 0) {
        queryFilters += `&filters[keyword_tags][keyPhrase][$containsi]=${query}`;
      }

      if (!currentCategory && query.length === 0) {
        const res = await axios.get(
          `${API}/vacancies?filters[isHot][$eq]=${true}`
        );

        setSelectedVacancies(res.data.data);
      } else {
        const res = await axios.get(
          `${API}/vacancies?populate=*${queryFilters}`
        );

        setSelectedVacancies(res.data.data);
      }

      // const res = await axios.get(`${API}/vacancies?
      // locale=${localization}&populate=*${queryFilters}`);

      // setSelectedVacancies(res.data.data);
    }, 400);
  }, [query, currentCategory]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(selectedVacancies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(selectedVacancies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, selectedVacancies]);

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="section">
          <div className="container">
            <div className="Vacancies__about">
              <ul className="Vacancies__about__list">
                <li className="Vacancies__about__item">
                  <div className="Vacancies__about__textWrapper">
                    <h1 className="Vacancies__about__title bold">
                      {vacancyData?.title}
                    </h1>
                    <p className="Vacancies__about__text">
                      <ReactMarkdown children={vacancyData?.description} />
                    </p>
                  </div>

                  <div className="Vacancies__about__imgWrapper">
                    <div className="Vacancies__about__decoration--small"></div>
                    <img
                      className="Vacancies__about__img"
                      src={PhotoAPI + vacancyData?.firstImage.data.attributes.url}
                      alt="Сat in front of the computer"
                    />
                  </div>
                </li>
                <VacanciesList isShowHot={false} />
                <li className="Vacancies__about__item">
                  {onlyWidth >= 1430 && (
                    <img
                      className="Vacancies__about__img"
                      src={PhotoAPI + vacancyData?.secondImage.data.attributes.url}
                      alt="Сat works at the keyboard"
                    />
                  )}

                  <div className="Vacancies__about__textWrapper">
                    <h2 className="Vacancies__about__title">{vacancyData?.secondTitle}</h2>
                    <p className="Vacancies__about__text">
                    <ReactMarkdown
                      children={vacancyData?.secondDescription}
                      className="descr"
                    />
                    </p>
                  </div>
                </li>
                <li className="Vacancies__about__item">
                  <div className="Vacancies__about__textWrapper--short">
                    <h2 className="Vacancies__about__title">{vacancyData?.thirdTitle}</h2>
                    <p className="Vacancies__about__text">
                    <ReactMarkdown
                      children={vacancyData?.thirdDescription}
                      className="descr"
                    />
                    </p>
                  </div>
                </li>
                <li className="Vacancies__about__item accent">
                  <img
                    className="Vacancies__about__item__img"
                    src={PhotoAPI + vacancyData?.thirdImage.data.attributes.url}
                    alt="Impressed cat"
                  />
                  <div className="Vacancies__about__textWrapper">
                    <h2 className="Vacancies__about__title">
                      {vacancyData?.listTitle}
                    </h2>
                    <ul className="Vacancies__about__item__requirements__list">
                    <ReactMarkdown children={vacancyData?.requirements} />
                    </ul>
                  </div>
                </li>
                <li className="Vacancies__about__item">
                  <div className="Vacancies__about__textWrapper--short">
                    <h2 className="Vacancies__about__title last_title">{vacancyData?.fouthTitle}</h2>
                    <p className="Vacancies__about__text">
                      <ReactMarkdown children={vacancyData?.forthDescription} />
                    </p>
                  </div>
                </li>
                <li className="Vacancies__about__item">
                  <div className="Vacancies__about__textWrapper--short">
                    <h2 className="Vacancies__about__title last_title">{vacancyData?.fifthTitle}</h2>
                    <p className="Vacancies__about__text">
                      <ReactMarkdown children={vacancyData?.fifthDescription} />
                    </p>
                  </div>
                  <div className="Vacancies__about__decoration--big"></div>
                </li>
              </ul>
            </div>
            <div className="form_wrapper">
              <FeedbackForm />
            </div>
          </div>
        </section>
      )}
    </>
  );
};
