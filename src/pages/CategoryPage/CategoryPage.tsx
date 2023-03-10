/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-children-prop */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-console */
import React, {
  useState, useEffect, Fragment, useRef
} from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { API } from "../../constants";

import sl from "./categoryPage.module.scss";
import { useStateContext } from "../../context/StateContext";
import VacancyCard from "../../components/vacancyCard";
import VacancyForm from "../../components/forms/vacancyForm";
import ToTopButton from "../../components/toTopButton/ToTopButton";

const CategoryPage = () => {
  const [category, setCategory] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const formSection = useRef<HTMLDivElement>(null);

  const { currentGlobalCategory, localization } = useStateContext();

  const { categoryID } = useParams();

  useEffect(() => {
    axios
      .get(`${API}/categories?locale=${
        localization === "ua" ? "uk" : localization
      }`)
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
      currentGlobalCategory.filter((el: any) => el.attributes.categories.data[0]
        ? el.attributes.categories.data[0].attributes.categorySlug === categoryID
        : "").sort((a: any, b: any) => {
        if (a.attributes.isHot && !b.attributes.isHot) {
          return -1;
        }

        if (!a.attributes.isHot && b.attributes.isHot) {
          return 1;
        }

        return 0;
      })
    );
  }, [currentGlobalCategory]);

  console.log(filteredVacancies);

  return (
    <div className={sl.container}>
      <div className={sl.category_page}>
        {category.map((item: any) => (
          <>
            <Fragment key={item.id}>
              <h1>{item.attributes.categoryTitle}</h1>
              <ReactMarkdown children={item.attributes.description} />
            </Fragment>
            <button
              type="button"
              onClick={() => formSection?.current?.scrollIntoView({
                block: "start",
                behavior: "smooth",
              })}
            >
              Подать заявку
            </button>
            <div className={sl.category_vacancies}>
              {filteredVacancies.map((item: any) => (
                <VacancyCard
                  key={item.id}
                  title={item.attributes.title}
                  slug={item.attributes.vacancySlug}
                  isHot={item.attributes.isHot}
                  cardDescription=""
                  categorySlug={item.attributes.categories.data[0].attributes.categorySlug}
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
