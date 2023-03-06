/* eslint-disable react/jsx-tag-spacing */
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
import "./vacancyList.scss";
import "../../global-styles/search.scss";
import axios from "axios";
import Select, { components } from "react-select";
import { Category, Vacancy, Collection, VacancyArray } from "../../types/types";
import VacancyCard from "../vacancyCard/VacancyCard";

import Find from "../../images/findIcon.svg";
import Close from "../../images/close.svg";
import SelectIcon from "../../images/selectArrow.svg";
import useOutsideAlerter from "../../hooks/useClickOutside";
import NotFoundVacancies from "../notFoundVacancies";
import { VACANCYLIST } from "../../database/common/vacancyList";
import { useStateContext } from "../../context/StateContext";

const API = "https://admin.r-ez.com/api";

const itemsPerPage = 6;

let searchTime: any;
let vacationTime: any;

export default function Vacancies() {
  const searchRef = useRef<HTMLDivElement>(null);
  const { localization, scrollToTopVacancies } = useStateContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [vacancies, setVacancies] = useState<VacancyArray[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>("");
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any>([]);
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
    const res = VACANCYLIST.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  useEffect(() => {
    axios
      .get(`${API}/categories?locale=${localization === "ua" ? "uk" : localization}`)
      .then((res) => {
        setCategories(res.data.data);
        console.log("Categories from vacancy list", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/vacancies?populate=*&locale=${localization === "ua" ? "uk" : localization}`)
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
        queryFilters += `&filters[keyword_tags][keyPhrase][$contains]=${query}`;
      }

      if (!currentCategory && query.length === 0) {
        const res = await axios.get(
          `${API}/vacancies?locale=${localization === "ua" ? "uk" : localization}&filters[isHot][$eq]=${true}`
        );

        setSelectedVacancies(res.data.data);
      } else {
        const res = await axios.get(
          `${API}/vacancies?populate=*&locale=${localization === "ua" ? "uk" : localization}${queryFilters}`
        );

        setSelectedVacancies(res.data.data);
      }

      // const res = await axios.get(`${API}/vacancies?
      // locale=${localization}&populate=*${queryFilters}`);

      // setSelectedVacancies(res.data.data);
    }, 400);
  }, [query, currentCategory]);

  const handleCategorySelect = useCallback(
    (selected: any) => {
      if (currentCategory !== selected.label) {
        setCurrentCategory(selected.label);
      } else {
        setCurrentCategory("");
      }
    },
    [currentCategory]
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setIsDropdown(false);
  }, []);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    // поменять теги
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
    scrollToTopVacancies?.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });

    setItemOffset(newOffset);
  };

  const customStyles = {
    control: () => ({
      border: "0 !important",
      boxShadow: "0 !important",
      "&:hover": {
        border: "0 !important",
      },
    }),
  };

  return (
    <>
      <div className="Vacancies">
        <h2 ref={scrollToTopVacancies} className="Vacancies__title">
          {data?.title}
        </h2>
        <div className="Vacancies__navigation">
          <div className="search-container" ref={searchRef}>
            <div className="search-inner">
              <div className="search-wrapper">
                <input
                  type="text"
                  value={query}
                  onChange={searchHandler}
                  placeholder={data?.placeholder}
                  className="search-input"
                />
                {!query ? (
                  <img src={Find} alt="find" className="search-icon" />
                ) : (
                  <button
                    className="search-clear"
                    type="button"
                    onClick={handleClear}
                  >
                    <img src={Close} alt="close" />
                  </button>
                )}
                <div className="search__dropdown">
                  {query ? (
                    <>
                      {isDropdown &&
                        searchCollection.slice(0, 10).map((collection) => (
                          <button
                            type="button"
                            key={collection.id}
                            onClick={() => onCollection(collection)}
                            className="search__dropdown-row"
                          >
                            {collection.attributes.keyPhrase}
                          </button>
                        ))}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {/* <button
                className="search__button"
                type="button"
                onClick={handleSearch}
              >
                Знайти
              </button> */}
            </div>
          </div>

          <div className="Vacancies__selects">
            <Select
              styles={customStyles}
              classNamePrefix="custom-select"
              options={selectCategories}
              value={getCategory()}
              onChange={handleCategorySelect}
              placeholder={data?.categoriesTitle}
              isSearchable={false}
              components={{
                DropdownIndicator,
              }}
            />
          </div>
        </div>

        <div className="Vacancies__cards">
          {currentItems.length >= 1 ? (
            currentItems.map((vacancy: any) => (
              <VacancyCard
                key={vacancy.id}
                title={vacancy.attributes.title}
                slug={vacancy.attributes.vacancySlug}
                isHot={vacancy.attributes.isHot}
                cardDescription={vacancy.attributes.cardDescription}
              />
            ))
          ) : (
            <NotFoundVacancies />
          )}
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
    </>
  );
}
