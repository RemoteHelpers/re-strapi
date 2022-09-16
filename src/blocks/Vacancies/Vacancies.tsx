/* eslint-disable no-console */
import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';
import ReactPaginate from 'react-paginate';
import './Vacancies.scss';
import '../../global-styles/search.scss';
import axios from 'axios';
import Select, { components } from 'react-select';
import {
  Category,
  Vacancy,
  Collection,
} from '../../types/types';
import VacancyCard from '../VacancyCard/VacancyCard';

import Find from '../../images/findIcon.svg';
import SelectIcon from '../../images/selectArrow.svg';
import useOutsideAlerter from '../../hooks/useClickOutside';

const API = 'http://beta.fv-a.com:1337/api';
const itemsPerPage = 6;

let searchTime: any;
let vacationTime: any;

export const Vacancies = () => {
  const searchRef = useRef<HTMLDivElement>(null);

  const [localization, setLocalization] = useState('en');
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [currentType, setCurrentType] = useState<string>('');
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [currentItems, setCurrentItems] = useState<any>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const selectType = [
    { value: 'FullTime', label: 'FullTime' },
    { value: 'PrtTime', label: 'PartTime' },
  ];

  const selectCategories = categories.map(category => (
    {
      value: category.attributes.categoryTitle.toLowerCase(),
      label: category.attributes.categoryTitle,
    }
  ));

  const selectLocalization = [
    { value: 'en', label: 'English' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'ru', label: 'Russian' },
  ];

  const DropdownIndicator = (
    props: any,
  ) => {
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
    axios.get(`${API}/categories?locale=${localization}`)
      .then(res => {
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [localization]);

  useEffect(() => {
    clearTimeout(vacationTime);
    vacationTime = setTimeout(async () => {
      let queryFilters = '';

      if (currentCategory) {
        queryFilters += `&filters[categories][categoryTitle][$contains]=${currentCategory}`;
      }

      if (currentType) {
        queryFilters += `&filters[workType][$contains]=${currentType}`;
      }

      if (query.length > 0) {
        queryFilters += `&filters[keyword_tags][keyPhrase][$containsi]=${query}`;
      }

      const res = await axios.get(`${API}/vacancies?locale=${localization}&populate=*${queryFilters}`);

      setSelectedVacancies(res.data.data);
    }, 400);
  }, [query, currentCategory, currentType, localization]);

  const handleLocalizationSelect = useCallback((selected: any) => {
    setLocalization(selected.value);
  }, []);

  const handleCategorySelect = useCallback((selected: any) => {
    setCurrentCategory(selected.label);
  }, []);

  const handleWorkTypeSelect = useCallback((selected: any) => {
    setCurrentType(selected.label);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
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
    // setSelectedCollection(collection);
    setIsDropdown(false);
  };

  const getCategory = () => {
    return currentCategory ? selectCategories.find(c => c.value === currentCategory) : '';
  };

  const getType = () => {
    return currentType ? selectType.find(c => c.value === currentType) : '';
  };

  const getLocalization = () => {
    return localization ? selectLocalization.find(c => c.value === localization) : '';
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(selectedVacancies.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(selectedVacancies.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, selectedVacancies]);

  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % selectedVacancies.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="Vacancies">
      <div className="container">
        <Select
          classNamePrefix="custom-select custom-select--locale"
          options={selectLocalization}
          value={getLocalization()}
          onChange={handleLocalizationSelect}
          placeholder={localization}
          components={
            {
              DropdownIndicator,
            }
          }

        />
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
              components={
                {
                  DropdownIndicator,
                }
              }
            />
            <Select
              classNamePrefix="custom-select"
              options={selectType}
              value={getType()}
              onChange={handleWorkTypeSelect}
              placeholder="Choose a work type"
              components={
                {
                  DropdownIndicator,
                }
              }
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
              {!query && (
                <img src={Find} alt="find" className="search-icon" />
              )}
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
                {searchCollection.length !== 0 ? (
                  searchCollection.slice(0, 10).map(collection => (
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
          {currentItems && (
            currentItems.map((vacancy: any) => (
              <VacancyCard
                key={vacancy.id}
                title={vacancy.attributes.title}
              />
            ))
          )}
          {/* {currentItems.map((vacancy: any) => (
            <VacancyCard
              key={vacancy.id}
              title={vacancy.attributes.title}
            />
          ))} */}
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
