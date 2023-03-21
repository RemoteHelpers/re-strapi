/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
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

const itemsPerPage = 9;

let searchTime: any;
let vacationTime: any;

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <img src={SelectIcon} alt="dropdown" />
    </components.DropdownIndicator>
  );
};

export default function Vacancies(props: any) {
  const searchRef = useRef<HTMLDivElement>(null);
  const { localization, scrollToTopVacancies, setCategorySlug, globalCategories, currentGlobalVacancies } =
    useStateContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [data, setData] = useState<any>();

  const selectCategories = categories.map((category) => ({
    value: category.attributes.categoryTitle.toLowerCase(),
    label: category.attributes.categoryTitle,
  }));

  useOutsideAlerter(searchRef, () => {
    setIsDropdown(false);
  });

  useEffect(() => {
    const res = VACANCYLIST.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  useEffect(() => {
    setCategories(globalCategories);
  }, [localization]);

  setCategorySlug(currentItems);
  useEffect(() => {
    clearTimeout(vacationTime);
    vacationTime = setTimeout(async () => {
      let queryFilters = "";

      if (currentCategory) {
        queryFilters += `&filters[categories][categoryTitle][$contains]=${currentCategory}`;
      }
      console.log(query, query.length);
      if (query.length >= 2) {
        queryFilters += `&filters[$or][0][title][$contains]=${query}&filters[$or][1][keyword_tags][keyPhrase][$contains]=${query}`;
      }
      if (!currentCategory && query.length === 0) {
        const res = await axios.get(
          `${API}/vacancies?locale=${
            localization === "ua" ? "uk" : localization
          }&filters[isHot][$eq]=${true}&populate=*`
        );
          // console.log(res);
        setSelectedVacancies(res.data.data);
      } else {
        const res = await axios.get(
          `${API}/vacancies?$pagintaion[limit]=-1&populate=*&locale=${
            localization === "ua" ? "uk" : localization
          }${queryFilters}`
        );

        setSelectedVacancies(
          res.data.data.sort((a: any, b: any) => {
            if (a.attributes.isHot && !b.attributes.isHot) {
              return -1;
            }
            if (!a.attributes.isHot && b.attributes.isHot) {
              return 1;
            }
            return 0;
          })
        );
      }
      const showHot = props.isShowHot;
      if (!currentCategory && !showHot) {
        const sortedVacancies = currentGlobalVacancies;
        setSelectedVacancies(sortedVacancies.sort((a:any, b:any) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()));
      }
    }, 400);
  }, [query, currentCategory, currentGlobalVacancies]);
  // console.log(currentGlobalVacancies);
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
    console.log(event.target.value, event.target.value.length);

      setQuery(event.target.value);
      // поменять теги
      clearTimeout(searchTime);
      searchTime = setTimeout(async () => {
        const res = await axios.get(
        //   `${API}/vacancies?locale=${
        // localization === "ua" ? "uk" : localization}&pagination[limit]=-1&filters[title][$contains]=${event.target.value}`
           `${API}/keyword-tags?filters[keyPhrase][$contains]=${event.target.value}`
        );
        // setIsDropdown(true);
        console.log(res.data);
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

  // console.log(currentItems);

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
              components={{ DropdownIndicator, }}
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
                categorySlug={
                  vacancy.attributes.categories.data[0].attributes.categorySlug
                }
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
