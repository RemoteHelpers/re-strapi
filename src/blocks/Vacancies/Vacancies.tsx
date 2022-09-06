/* eslint-disable no-console */
import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
import './Vacancies.scss';
import '../../global-styles/search.scss';
import axios from 'axios';
import {
  Category,
  Vacancy,
  Collection,
} from '../../types/types';
import VacancyCard from '../VacancyCard/VacancyCard';

import Find from '../../images/findIcon.svg';
import useOutsideAlerter from '../../hooks/useClickOutside';

const API = 'http://beta.fv-a.com:1337/api';

let searchTime: any;

export const Vacancies = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentType, setCurrentType] = useState<string>('');
  // const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<Collection>();

  const [isDropdown, setIsDropdown] = useState<boolean>(false);

  useOutsideAlerter(searchRef, () => {
    setIsDropdown(false);
  });

  useEffect(() => {
    axios.get(`${API}/categories`)
      .then(res => {
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    (async () => {
      let queryFilters = '';

      if (currentCategory) {
        queryFilters += `&filters[categories][categoryTitle][$contains]=${currentCategory}`;
      }

      if (currentType) {
        queryFilters += `&filters[workType][$contains]=${currentType}`;
      }

      if (selectedCollection?.attributes.keyPhrase) {
        queryFilters += `&filters[keyword_tags][keyPhrase][$containsi]=${selectedCollection.attributes.keyPhrase}`;
      }

      const res = await axios.get(`${API}/vacancies?populate=*${queryFilters}`);

      setSelectedVacancies(res.data.data);
    })();
  }, [selectedCollection, currentCategory, currentType]);

  // useEffect(() => {
  //   console.log(vacancies.filter(vacancy => (
  //     vacancy.attributes.keyword_tags.data
  //       .find(el => query.toLowerCase().includes(el.attributes.keyPhrase.toLowerCase()))
  //   )).filter(vacancy => (
  //     vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
  //   )).map(vacancy => (
  //     <h1 key={vacancy.id}>{vacancy.attributes.title}</h1>
  //   )));
  //   if (query) {
  //     setSelectedVacancies(selectedVacancies.filter(vacancy => (
  //       vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
  //     )));
  //   } else {
  //     setSelectedVacancies(vacancies.filter(vacancy => (
  //       vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
  //     )));
  //   }
  // }, [currentCategory]);

  // useEffect(() => {
  //   if (query) {
  //     setSelectedVacancies(selectedVacancies.filter(vacancy => (
  //       vacancy.attributes.workType === currentType
  //     )));
  //   } else {
  //     setSelectedVacancies(vacancies.filter(vacancy => (
  //       vacancy.attributes.workType === currentType
  //     )));
  //   }
  // }, [currentType]);

  const handleCategorySelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(event.target.value);
  }, []);

  const handleWorkTypeSelect = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentType(event.target.value);
  }, []);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    clearTimeout(searchTime);
    searchTime = setTimeout(async () => {
      const res = await axios.get(`${API}/keyword-tags?filters[keyPhrase][$contains]=${event.target.value}`);

      setIsDropdown(true);
      setSearchCollection(res?.data?.data || []);
    }, 300);
  };

  const onCollection = (collection: Collection) => {
    setQuery(collection.attributes.keyPhrase);
    setSelectedCollection(collection);
    setIsDropdown(false);
  };

  return (
    <div className="Vacancies">
      <div className="container">
        <h2 className="Vacancies__title">
          Current
          <br />
          Remote Jobs
        </h2>
        <div className="Vacancies__navigation">
          <div className="Vacancies__selects">
            <label>
              <select
                name="categories"
                value={currentCategory}
                onChange={handleCategorySelect}
                className="Vacancies__filter"
              >
                <option selected value="">Choose a category</option>
                {categories.map(category => (
                  <option
                    key={category.id}
                    value={category.attributes.categoryTitle}
                  >
                    {category.attributes.categoryTitle}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <select
                name="typeOfWork"
                value={currentType}
                onChange={handleWorkTypeSelect}
                className="Vacancies__filter"
              >
                <option selected value="">Choose a work type</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
              </select>
            </label>
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
              {!query && (
                <img src={Find} alt="find" className="search-icon" />
              )}
            </div>
            {/* {isDropdown && (
              <div className="search__dropdown">
                {searchCollection.filter(collection => {
                  const searchTerm = query.toLowerCase();
                  const vacation = collection.attributes.keyPhrase.toLowerCase();

                  return searchTerm && vacation.includes(searchTerm) && vacation !== searchTerm;
                }).slice(0, 10).map(collection => (
                  <button
                    type="button"
                    key={collection.id}
                    onClick={() => onCollection(collection.attributes.keyPhrase)}
                    className="search__dropdown-row"
                  >
                    {collection.attributes.keyPhrase}
                  </button>
                ))}
              </div>
            )} */}
            {isDropdown && (
              <div className="search__dropdown">
                {searchCollection.length !== 0 ? (
                  searchCollection.map(collection => (
                    <button
                      type="button"
                      key={collection.id}
                      onClick={() => onCollection(collection)}
                      className="search__dropdown-row"
                    >
                      {collection.attributes.keyPhrase}
                    </button>
                  ))
                ) : 'Not found'}
              </div>
            )}
          </div>
        </div>

        <div className="Vacancies__cards">
          {/* {!query && currentCategory === 'Choose a category' && vacancies.map(vacancy => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))} */}

          {/* {currentCategory !== 'Choose a category' && query !== ''} */}

          {/* {!query && vacancies.filter(vacancy => (
            vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
          )).map(vacancy => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))} */}

          {/* {query && currentCategory === 'Choose a category' && vacancies.filter(vacancy => (
            vacancy.attributes.keyword_tags.data
              .find(el => query.toLowerCase() === (el.attributes.keyPhrase.toLowerCase()))
          )).map(vacancy => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))} */}

          {/* {query && currentCategory !== 'Choose a category' && vacancies.filter(vacancy => (
            vacancy.attributes.keyword_tags.data
              .find(el => query.toLowerCase() === (el.attributes.keyPhrase.toLowerCase()))
          )).filter(vacancy => (
            vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
          )).map(vacancy => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))} */}
          {selectedVacancies.map(vacancy => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
