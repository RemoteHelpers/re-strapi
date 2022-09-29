/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import './Header.scss';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { useStateContext } from '../../context/StateContext';

import {
  Category, Vacancy,
} from '../../types/types';

import Logo from '../../images/mainScreen/Logo.png';
import SelectIcon from '../../images/selectArrow.svg';

const API = 'http://testseven.rh-s.com:1733/api';

const Header = () => {
  const { localization, setLocalization } = useStateContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [activeMenu, setActiveMenu] = useState('main');
  const [isDesktopMenuOpened, setIsDesktopMenuOpened] = useState(false);

  // useEffect(() => {
  //   document.documentElement.classList.toggle('no-overflow');
  // }, [isMenuOpened]);

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

  const selectLocalization = [
    { value: 'en', label: 'EN' },
    { value: 'uk', label: 'UA' },
    { value: 'ru', label: 'RU' },
  ];

  const getLocalization = () => {
    return localization ? selectLocalization.find(c => c.value === localization) : '';
  };

  const DropdownIndicator = (
    props: any,
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={SelectIcon} alt="dropdown" />
      </components.DropdownIndicator>
    );
  };

  const handleLocalizationSelect = useCallback((selected: any) => {
    setLocalization(selected.value);
  }, []);

  const handleMenuClick = useCallback(() => {
    // eslint-disable-next-line no-shadow
    setIsMenuOpened(isMenuOpened => !isMenuOpened);
  }, []);

  useEffect(() => {
    axios.get(`${API}/vacancies?populate=*&filters[categories][categoryTitle][$eq]=${currentCategory}`)
      .then(arr => {
        setSelectedVacancies(arr.data.data);
        console.log(arr.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentCategory]);

  const handleCategorySelect = useCallback((event: any) => {
    setCurrentCategory(event.target.text);
    console.log(currentCategory);
    setActiveMenu('vacancies');
  }, []);

  return (
    <div id="header" className="Header">
      <img src={Logo} alt="logo" className="Header__logo" />
      <div className="Header__functionality">
        <nav className="Header__navbar">
          <a
            href="http://localhost:3000/"
            className="Header__link"
            onMouseOver={() => setIsDesktopMenuOpened(true)}
            onMouseLeave={() => setIsDesktopMenuOpened(false)}
          >
            Вакансии
          </a>
          <a href="http://localhost:3000/" className="Header__link">
            О Нас
          </a>
          <a href="http://localhost:3000/" className="Header__link">
            Видеоинтервью
          </a>
        </nav>
        <Select
          classNamePrefix="custom-select-header"
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

        <button
          type="button"
          onClick={handleMenuClick}
          className="Header__menu-button"
        >
          <div className={classNames('Header__menu-icon', { 'Header__menu-icon--active': isMenuOpened })}></div>
        </button>
      </div>

      <div className={classNames('Header__drop-menu', { 'Header__drop-menu--active': isMenuOpened })}>
        <h4 className="Header__drop-menu--title">Меню</h4>
        <nav className="Header__navbar--mobile">
          <CSSTransition
            in={activeMenu === 'main'}
            unmountOnExit
            timeout={500}
            classNames="menu-primary"
          >
            <div className="menu">
              <a
                href="#"
                className="Header__link--mobile"
                onClick={() => 'categories' && setActiveMenu('categories')}
              >
                Вакансії
              </a>
              <a href="http://localhost:3000/" className="Header__link--mobile">
                Про нас
              </a>
              <a href="http://localhost:3000/" className="Header__link--mobile">
                Інтерв’ю
              </a>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'categories'}
            unmountOnExit
            timeout={500}
            classNames="menu-secondary"
          >
            <div className="menu">
              <a
                href="#"
                className="Header__link--mobile"
                onClick={() => 'main' && setActiveMenu('main')}
              >
                Назад до меню
              </a>
              {categories.map(category => (
                <a
                  key={category.id}
                  href="#"
                  className="Header__link--mobile"
                  onClick={handleCategorySelect}
                >
                  {category.attributes.categoryTitle}
                </a>
              ))}
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'vacancies'}
            unmountOnExit
            timeout={500}
            classNames="menu-thirdly"
          >
            <div className="menu">
              <a
                href="#"
                className="Header__link--mobile"
                onClick={() => 'categories' && setActiveMenu('categories')}
              >
                Назад до категорій
              </a>

              {selectedVacancies.map(vacancy => (
                <a
                  key={vacancy.id}
                  href="#"
                  className="Header__link--mobile"
                  onClick={handleCategorySelect}
                >
                  {vacancy.attributes.title}
                </a>
              ))}
            </div>
          </CSSTransition>
        </nav>
      </div>
    </div>
  );
};

export default Header;
