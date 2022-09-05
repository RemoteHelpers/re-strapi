/* eslint-disable no-console */
import React, { useCallback, useEffect, useState } from 'react';
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

export const Vacancies = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('Choose a category');
  const [currentType, setCurrentType] = useState<string>('Choose a work type');
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    axios.get('http://beta.fv-a.com:1337/api/categories')
      .then(res => {
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios.get('http://beta.fv-a.com:1337/api/vacancies?populate=*')
      .then(res => {
        setVacancies(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

    // const vacancyEndpoint = `http://beta.fv-a.com:1337/api/vacancies?populate=*&filters[categories][categoryTitle][$contains]=${currentCategory}`;

    // axios.get(vacancyEndpoint)
    //   .then(res => {
    //     setSelectedVacancies(res.data.data);
    //     console.log(res.data.data);
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    axios.get('http://beta.fv-a.com:1337/api/keyword-tags')
      .then(res => {
        setSearchCollection(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   setSelectedVacancies(vacancies.filter(vacancy => {
  //     const temp = vacancy.attributes.keyword_tags.data
  //       .find(el => query.toLowerCase().includes(el.attributes.keyPhrase.toLowerCase()));

  //     return temp;
  //   }));
  // }, [query]);

  useEffect(() => {
    console.log(vacancies.filter(vacancy => (
      vacancy.attributes.keyword_tags.data
        .find(el => query.toLowerCase().includes(el.attributes.keyPhrase.toLowerCase()))
    )).filter(vacancy => (
      vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
    )).map(vacancy => (
      <h1 key={vacancy.id}>{vacancy.attributes.title}</h1>
    )));
    if (query) {
      setSelectedVacancies(selectedVacancies.filter(vacancy => (
        vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
      )));
    } else {
      setSelectedVacancies(vacancies.filter(vacancy => (
        vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
      )));
    }
  }, [currentCategory]);

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

  const searchHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onCollection = (searchTerm: React.SetStateAction<string>) => {
    setQuery(searchTerm);
  };

  const focusHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
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
                <option selected disabled>Choose a category</option>
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
                <option selected disabled>Choose a work type</option>
                <option value="FullTime">FullTime</option>
                <option value="PartTime">PartTime</option>
              </select>
            </label>
          </div>

          <div className="search-container">
            <div className="search-inner">
              {!isFocused && !query && (
                <img src={Find} alt="find" className="search-icon" />
              )}
              <input
                type="text"
                value={query}
                onChange={searchHandler}
                placeholder="Job Search"
                className="search-input"
                onFocus={() => focusHandler()}
                onBlur={() => blurHandler()}
              />
            </div>

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
          </div>
        </div>

        <div className="Vacancies__cards">
          {!query && currentCategory === 'Choose a category' && vacancies.map(vacancy => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))}
        </div>

        {!query && vacancies.filter(vacancy => (
          vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
        )).map(vacancy => (
          <h1 key={vacancy.id}>{vacancy.attributes.title}</h1>
        ))}

        {query && currentCategory === 'Choose a category' && vacancies.filter(vacancy => (
          vacancy.attributes.keyword_tags.data
            .find(el => query.toLowerCase().includes(el.attributes.keyPhrase.toLowerCase()))
        )).map(vacancy => (
          <h1 key={vacancy.id}>{vacancy.attributes.title}</h1>
        ))}

        {query && currentCategory !== 'Choose a category' && vacancies.filter(vacancy => (
          vacancy.attributes.keyword_tags.data
            .find(el => query.toLowerCase().includes(el.attributes.keyPhrase.toLowerCase()))
        )).filter(vacancy => (
          vacancy.attributes.categories.data[0].attributes.categoryTitle === currentCategory
        )).map(vacancy => (
          <h1 key={vacancy.id}>{vacancy.attributes.title}</h1>
        ))}
      </div>
    </div>
  );
};
