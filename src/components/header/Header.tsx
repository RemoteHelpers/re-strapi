/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import cl from './header.module.scss';
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
        // console.log(res.data.data);
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
    <div id="header" className={cl.Header}>
      <img src={Logo} alt="logo" className={cl.Header__logo} />
      <div className={cl.Header__functionality}>
        <nav className={cl.Header__navbar}>
          <a
            href="http://localhost:3000/"
            className={cl.Header__link}
            onMouseOver={() => setIsDesktopMenuOpened(true)}
            onMouseLeave={() => setIsDesktopMenuOpened(false)}
          >
            Вакансии
          </a>
          <a href="http://localhost:3000/" className={cl.Header__link}>
            О Нас
          </a>
          <a href="http://localhost:3000/" className={cl.Header__link}>
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
          className={cl.Header__menuButton}
        >
          <div className={classNames(cl.Header__menuIcon, {
            [cl.Header__menuIcon_active]: isMenuOpened })}
          >
          </div>
        </button>
      </div>

      <div className={classNames(cl.Header__dropMenu, {
        [cl.Header__dropMenu_active]: isMenuOpened })}
      >
        <h4 className={cl.Header__dropMenu_title}>Меню</h4>
        <nav className={cl.Header__navbar_mobile}>
          <CSSTransition
            in={activeMenu === 'main'}
            unmountOnExit
            timeout={500}
            classNames={cl.menu_primary}
          >
            <div className={cl.menu}>
              <a
                href="#"
                className={cl.Header__link_mobile}
                onClick={() => 'categories' && setActiveMenu('categories')}
              >
                Вакансії
              </a>
              <a href="http://localhost:3000/" className={cl.Header__link_mobile}>
                Про нас
              </a>
              <a href="http://localhost:3000/" className={cl.Header__link_mobile}>
                Інтерв’ю
              </a>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'categories'}
            unmountOnExit
            timeout={500}
            classNames={cl.menu_Secondary}
          >
            <div className={cl.menu}>
              <a
                href="#"
                className={cl.Header__link_mobile}
                onClick={() => 'main' && setActiveMenu('main')}
              >
                Назад до меню
              </a>
              {categories.map(category => (
                <a
                  key={category.id}
                  href="#"
                  className={cl.Header__link_mobile}
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
            classNames={cl.menu_Thirdly}
          >
            <div className={cl.menu}>
              <a
                href="#"
                className={cl.Header__link_mobile}
                onClick={() => 'categories' && setActiveMenu('categories')}
              >
                Назад до категорій
              </a>

              {selectedVacancies.map(vacancy => (
                <a
                  key={vacancy.id}
                  href="#"
                  className={cl.Header__link_mobile}
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
