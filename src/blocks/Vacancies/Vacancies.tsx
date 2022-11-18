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

import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactPaginate from "react-paginate";
import { useWindowWidth } from "@react-hook/window-size";
import "./Vacancies.scss";
import "../../global-styles/search.scss";
import axios from "axios";
import Select, { components } from "react-select";
import { Category, Vacancy, Collection, VacancyArray } from "../../types/types";
import { VACANCIES_PAGE } from "../../database/vacanciesPage";

import SelectIcon from "../../images/selectArrow.svg";
import useOutsideAlerter from "../../hooks/useClickOutside";

import cat1 from "../../images/vacancy_list/cat1_vacancy_list.png";
import cat2 from "../../images/vacancy_list/cat2_vacancy_list.png";
import cat3 from "../../images/vacancy_list/cat3_vacancy_list.png";
import FeedbackForm from "../../components/forms/feedbackForm";
import formImg from "../../images/formImg.png";
import VacanciesList from "../../components/vacanciesList";
import { useStateContext } from "../../context/StateContext";

const API = "http://testseven.rh-s.com:1733/api";
const itemsPerPage = 6;

let searchTime: any;
let vacationTime: any;

export default function Vacancies() {
  const { localization } = useStateContext();

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

  const selectCategories = categories.map((category) => ({
    value: category.attributes.categoryTitle.toLowerCase(),
    label: category.attributes.categoryTitle,
  }));

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={SelectIcon} alt="dropdown" />
      </components.DropdownIndicator>
    );
  };

  useOutsideAlerter(searchRef, () => {
    setIsDropdown(false);
  });

  useEffect(() => {
    const res = VACANCIES_PAGE.filter(el => (el.language === localization));
    setData(res[0]);
    console.log(data);
  }, [localization]);

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

  // useEffect(() => {
  //   vacancies.map(vacancy => {
  //     setCurrentVacancy(vacancy.attributes.vacancySlug);
  //     console.log(vacancy.attributes.vacancySlug);
  //   });
  // }, [vacancies]);

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

  const handleCategorySelect = useCallback((selected: any) => {
    setCurrentCategory(selected.label);
  }, []);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    clearTimeout(searchTime);
    searchTime = setTimeout(async () => {
      const res = await axios.get(
        `${API}/keyword-tags?filters[keyPhrase][$contains]=${event.target.value}`
      );

      setIsDropdown(true);
      setSearchCollection(res?.data?.data || []);
    }, 300);
  };

  const onCollection = (collection: Collection) => {
    setQuery(collection.attributes.keyPhrase);
    // setSelectedCollection(collection);
    setIsDropdown(false);
  };

  const getCategory = () => {
    return currentCategory
      ? selectCategories.find((c) => c.value === currentCategory)
      : "";
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(selectedVacancies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(selectedVacancies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, selectedVacancies]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset =
      (event.selected * itemsPerPage) % selectedVacancies.length;

    setItemOffset(newOffset);
  };

  const onlyWidth = useWindowWidth();

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="Vacancies__about">
            <ul className="Vacancies__about__list">
              <li className="Vacancies__about__item">
                <div className="Vacancies__about__textWrapper">
                  <h1 className="Vacancies__about__title bold">
                    {data?.title}
                  </h1>
                  <p className="Vacancies__about__text">
                    {data?.titleDescription}
                  </p>
                </div>

                <div className="Vacancies__about__imgWrapper">
                  <div className="Vacancies__about__decoration--small"></div>
                  <img
                    className="Vacancies__about__img"
                    src={cat1}
                    alt="Сat in front of the computer"
                  />
                </div>
              </li>
              <li className="Vacancies__about__item">
                {onlyWidth >= 1430 && (
                  <img
                    className="Vacancies__about__img"
                    src={cat2}
                    alt="Сat works at the keyboard"
                  />
                )}

                <div className="Vacancies__about__textWrapper">
                  <h2 className="Vacancies__about__title">
                    {data?.title2}
                  </h2>
                  <p className="Vacancies__about__text">
                  {data?.title2Description}
                  </p>
                </div>
              </li>
              <li className="Vacancies__about__item">
                <div className="Vacancies__about__textWrapper--short">
                  <h2 className="Vacancies__about__title">
                    {data?.title3}
                  </h2>
                  <p className="Vacancies__about__text">
                    {data?.title3Description}
                  </p>
                </div>
              </li>
              <li className="Vacancies__about__item accent">
                <img
                  className="Vacancies__about__item__img"
                  src={cat3}
                  alt="Impressed cat"
                />
                <div className="Vacancies__about__textWrapper">
                  <h2 className="Vacancies__about__title">
                    {data?.listTitle}
                  </h2>
                  <ul className="Vacancies__about__item__requirements__list">
                    {data?.list?.map((el: string, index: any) => (
                      <li
                        className="Vacancies__about__item__requirements__item"
                        key={index}
                      >
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="Vacancies__about__item">
                <div className="Vacancies__about__textWrapper--short">
                  <h2 className="Vacancies__about__title">
                    {data?.title4}
                  </h2>
                  <p className="Vacancies__about__text">
                    {data?.title4Description}
                  </p>
                </div>
              </li>
              <li className="Vacancies__about__item">
                <div className="Vacancies__about__textWrapper--short">
                  <h2 className="Vacancies__about__title">
                    {data?.title5}
                  </h2>
                  <p className="Vacancies__about__text">
                    {data?.title5Description}
                  </p>
                </div>
                <div className="Vacancies__about__decoration--big"></div>
              </li>
            </ul>
          </div>
          <VacanciesList />
          <div className="form_wrapper">
            <FeedbackForm />
          </div>
        </div>
      </section>
    </>
  );
}
