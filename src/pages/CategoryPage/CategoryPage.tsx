/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-children-prop */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-console */
import React, { useState, useEffect, Fragment, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { API } from "../../constants";

import sl from "./categoryPage.module.scss";
import { useStateContext } from "../../context/StateContext";
import VacancyCard from "../../components/vacancyCard";
import VacancyForm from "../../components/forms/vacancyForm";
import ToTopButton from "../../components/toTopButton/ToTopButton";
import NotFoundPage from "../notFoundPage/notFoundPage";
import { Breadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const CategoryPage = () => {
  const [category, setCategory] = useState<any>([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const formSection = useRef<HTMLDivElement>(null);

  const {
    currentGlobalVacancies,
    localization,
    globalCategories,
    scrollToTop,
  } = useStateContext();

  const { categoryID } = useParams();

  useEffect(() => {
    scrollToTop?.current?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/categories?locale=${
          localization === "ua" ? "uk" : localization
        }`
      )
      .then((res) => {
        setCategory(
          res.data.data.filter(
            (el: any) => el.attributes.categorySlug === categoryID
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, [localization]);

  useEffect(() => {
    setFilteredVacancies(
      // eslint-disable-next-line no-confusing-arrow
      currentGlobalVacancies
        .filter((el: any) =>
          el.attributes.categories.data[0]
            ? el.attributes.categories.data[0].attributes.categorySlug ===
              categoryID
            : ""
        )
        .sort((a: any, b: any) => {
          if (a.attributes.isHot && !b.attributes.isHot) {
            return -1;
          }

          if (!a.attributes.isHot && b.attributes.isHot) {
            return 1;
          }

          return 0;
        })
    );
  }, [currentGlobalVacancies]);

  const categorySlugs = globalCategories.map(
    (item: { attributes: { categorySlug: any } }) =>
      item.attributes.categorySlug
  );

  if (!categorySlugs.includes(categoryID)) {
    // If the category ID is not included in the categorySlugs array, render the 404 component
    return <NotFoundPage />;
  }

  const routingRule = localization === 'ru';

  return (
    <div className={sl.container}>
      <div className={sl.category_page}>
        <Breadcrumbs
          separator={
            <NavigateNextIcon className={sl.crumbArrow} fontSize="medium" />
          }
          className={sl.breadCrumbArrows}
          aria-label="breadcrumb"
        >
          <Link
            className={`${sl.normalCrumb} ${sl.firstCrumb}`}
            color="inherit"
            to={routingRule ? "/" : `/${localization}`}
          >
            Home
          </Link>
          <Typography className={sl.activeCrumb}>
            {categoryID}
          </Typography>
        </Breadcrumbs>
        {category.map((item: any) => (
          <>
            <Fragment key={item.id}>
              <h1>{item.attributes.categoryTitle}</h1>
              <ReactMarkdown children={item.attributes.description} />
            </Fragment>
            <button
              type="button"
              onClick={() =>
                formSection?.current?.scrollIntoView({
                  block: "start",
                  behavior: "smooth",
                })
              }
            >
              {category[0]?.attributes.categoryButton}
            </button>
            <div className={sl.category_vacancies}>
              {filteredVacancies.map((item: any) => (
                <VacancyCard
                  key={item.id}
                  title={item.attributes.title}
                  slug={item.attributes.vacancySlug}
                  isHot={item.attributes.isHot}
                  cardDescription=""
                  categorySlug={
                    item.attributes.categories.data[0].attributes.categorySlug
                  }
                />
              ))}
            </div>
            <div ref={formSection}></div>
            <div className={sl.category_form}>
              <VacancyForm />
            </div>
          </>
        ))}
      </div>
      <div className={sl.toTopButton}>
        <ToTopButton />
      </div>
    </div>
  );
};

export default CategoryPage;
