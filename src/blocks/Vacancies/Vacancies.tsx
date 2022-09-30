
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
import { Category, Vacancy, Collection } from "../../types/types";
import VacancyCard from "../VacancyCard/VacancyCard";

import Find from "../../images/findIcon.svg";
import SelectIcon from "../../images/selectArrow.svg";
import useOutsideAlerter from "../../hooks/useClickOutside";

import cat1 from "../../images/cat1_vacancy_list.png";
import cat2 from "../../images/cat2_vacancy_list.png";
import cat3 from "../../images/cat3_vacancy_list.png";

const API = "http://testseven.rh-s.com:1733/api";
const itemsPerPage = 6;

let searchTime: any;
let vacationTime: any;

export const Vacancies = () => {
  const searchRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [vacancies, setVacancies] = useState<VacancyArray[]>([]);
  const [currentVacancy, setCurrentVacancy] = useState<string>('');
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

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
    axios.get(`${API}/categories`)
      .then(res => {
        setCategories(res.data.data);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get(`${API}/vacancies?populate=*`)
      .then(res => {
        setVacancies(res.data.data);
        // console.log(res.data.data);
      })
      .catch(err => {
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
    <div className="container">
      <div className="Vacancies__about">
        <ul className="Vacancies__about__list">
          <li className="Vacancies__about__item">
            <div className="Vacancies__about__textWrapper">
              <h1 className="Vacancies__about__title bold">
                Вакансии на удаленую работу
              </h1>
              <p className="Vacancies__about__text">
                Открыты вакансии на удалённую работу. Требуются сотрудники на
                полную ставку, с опытом или без опыта работы, но с обязательным
                знанием английского на уровне восприятия английской речи и
                способности вести переписки по рабочим моментам без словаря.
                <br />
                <br />
                5-дневная рабочая неделя и 9-часовой рабочий день. Возможность
                работы как в утренние, так и вечерние смены.
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
            {onlyWidth >= 1440 && (
              <img
                className="Vacancies__about__img"
                src={cat2}
                alt="Сat works at the keyboard"
              />
            )}

            <div className="Vacancies__about__textWrapper">
              <h2 className="Vacancies__about__title">
                RemotEmployees предоставляет вакансии на удаленную работу в
                сфере IT
              </h2>
              <p className="Vacancies__about__text">
                Наша компания предоставляет услуги в сфере IT и маркетинга.
                Поэтому, мы ищем специалистов, которые хотят развиваться и
                получать опыт работы именно в этих направлениях.
                <br />
                <br />
                Так как мы сотрудничаем с представителями Западного и
                Европейского рынка знание английского языка является основным
                требованием к кандидатам.
              </p>
            </div>
          </li>
          <li className="Vacancies__about__item">
            <div className="Vacancies__about__textWrapper--short">
              <h2 className="Vacancies__about__title">
                У нас есть вакансии на удаленную работу, не требующие опыта
                работы
              </h2>
              <p className="Vacancies__about__text">
                Мы готовы взять специалистов без опыта работы. Главое – ваше
                трудолюбие и стремление развиваться. Мы проводим вводное
                обучение для новичков в компании. После принятия на работу вам
                предоставят все необходимые материалы по изучению новых
                должностных обязанностей и способов их выполнения.
                <br />
                <br />
                Еженедельно в отделах происходят онлайн-собрания, на которых вы
                сможете задать интересующие вас вопросы. Также, вы сможете
                попробовать себя на разных вакансиях на удаленную работу и
                расширить свои профессиональные знания.
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
                Требования к кандидатам на вакансии на удаленную работу
              </h2>
              <ul className="Vacancies__about__item__requirements__list">
                <li className="Vacancies__about__item__requirements__item">
                  Знание английского языка не ниже уровня В1+
                </li>
                <li className="Vacancies__about__item__requirements__item">
                  Способность к усвоению большого объема информации Навыки
                  работы в команде
                </li>
                <li className="Vacancies__about__item__requirements__item">
                  Способность к анализу данных
                </li>
                <li className="Vacancies__about__item__requirements__item">
                  Коммуникабельность
                </li>
                <li className="Vacancies__about__item__requirements__item">
                  Ответственность
                </li>
                <li className="Vacancies__about__item__requirements__item">
                  Навыки тайм-менеджмента
                </li>
                <li className="Vacancies__about__item__requirements__item">
                  Из-за удаленного вида работы, вы должны уметь самостоятельно
                  распределять задачи по уровню важности и управлять рабочим
                  временем
                </li>
              </ul>
            </div>
          </li>
          <li className="Vacancies__about__item">
            <div className="Vacancies__about__textWrapper--short">
              <h2 className="Vacancies__about__title">
                Преимущества удаленной работы в компании RemotEmployees
              </h2>
              <p className="Vacancies__about__text">
                Так как мы предоставляем вакансии на удаленную работу, основным
                преимуществом будет то, что вы сами в праве выбирать место
                работы. Всё что вам нужно для эффективной работы – это компьютер
                и подключение к интернету. Работая у нас, вы получаете
                стабильную заработную плату, выплаты происходят два раза в
                месяц.
                <br />
                <br />
                График работы вы также можете выбирать самостоятельно (утренний
                или вечерний) поэтому, наши вакансии подойдут даже студентам. В
                добавок ко всему вы получите дружный коллектив, поддержку от
                руководителей и сотрудников компании, а также дружескую
                атмосферу в отделе.
              </p>
            </div>
          </li>
          <li className="Vacancies__about__item">
            <div className="Vacancies__about__textWrapper--short">
              <h2 className="Vacancies__about__title">
                Ознакомьтесь с вакансиями на удаленную работу, которые мы
                предоставляем
              </h2>
              <p className="Vacancies__about__text">
                Так как мы предоставляем вакансии на удаленную работу, основным
                преимуществом будет то, что вы сами в праве выбирать место
                работы. Всё что вам нужно для эффективной работы – это компьютер
                и подключение к интернету. Работая у нас, вы получаете
                стабильную заработную плату, выплаты происходят два раза в
                месяц.
                <br />
                <br />
                График работы вы также можете выбирать самостоятельно (утренний
                или вечерний) поэтому, наши вакансии подойдут даже студентам. В
                добавок ко всему вы получите дружный коллектив, поддержку от
                руководителей и сотрудников компании, а также дружескую
                атмосферу в отделе.
              </p>
            </div>
            <div className="Vacancies__about__decoration--big"></div>
          </li>
        </ul>
      </div>
      <div className="Vacancies">
        <h2 className="Vacancies__title">
          Current
          <br />
          Remote Jobs
        </h2>
        <div className="Vacancies__navigation">
          <div className="Vacancies__selects">
            <Select
              classNamePrefix="custom-select"
              options={selectCategories}
              value={getCategory()}
              onChange={handleCategorySelect}
              placeholder="Choose a category"
              components={{
                DropdownIndicator,
              }}
            />
          </div>

          <div className="search-container" ref={searchRef}>
            <div className="search-inner">
              <input
                type="text"
                value={query}
                onChange={searchHandler}
                placeholder="Job Search"
                className="search-input"
              />
              {!query && <img src={Find} alt="find" className="search-icon" />}
              <button
                className="search__button"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
            {isDropdown && (
              <div className="search__dropdown">
                {searchCollection.length !== 0
                  ? searchCollection.slice(0, 10).map((collection) => (
                      <button
                        type="button"
                        key={collection.id}
                        onClick={() => onCollection(collection)}
                        className="search__dropdown-row"
                      >
                        {collection.attributes.keyPhrase}
                      </button>
                    ))
                  : "Not found"}
              </div>
            )}
          </div>
        </div>

        <div className="Vacancies__cards">
          {currentItems &&
            currentItems.map((vacancy: any) => (
              <VacancyCard
                key={vacancy.id}
                // id={vacancy.id}
                title={vacancy.attributes.title}
                currentVacancy={currentVacancy}
              // subTitle={vacancy.attributes.subTitle}
              // isHot={vacancy.attributes.isHot}
              />
            ))}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel=""
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="page-num--active"
          // renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};
