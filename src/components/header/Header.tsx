/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Select, { components } from 'react-select';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import './header.scss';
import { useStateContext } from '../../context/StateContext';
import {
  Category, Vacancy,
} from '../../types/types';
import Logo from '../../images/mainScreen/Logo.png';
import SelectIcon from '../../images/selectArrow.svg';
import useOutsideAlerter from '../../hooks/useClickOutside';
import NextIcon from '../../images/header/nextIcon.svg';

const API = "http://testseven.rh-s.com:1733/api";

const Header = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const { localization, setLocalization } = useStateContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [activeMenu, setActiveMenu] = useState("main");
  const [isDesktopMenuOpened, setIsDesktopMenuOpened] = useState(false);
  const [currentMenuCategory, setCurrentMenuCategory] = useState("Розробка");
  const [selectedMenuVacancies, setSelectedMenuVacancies] = useState<Vacancy[]>(
    []
  );

  // useEffect(() => {
  //   document.documentElement.classList.toggle('no-overflow');
  // }, [isMenuOpened]);

  useOutsideAlerter(searchRef, () => {
    setIsDesktopMenuOpened(false);
  });

  useEffect(() => {
    axios
      .get(`${API}/categories`)
      .then((res) => {
        setCategories(res.data.data);
        // console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   document.documentElement.classList.toggle('darken');
  // }, [isDesktopMenuOpened]);

  const selectLocalization = [
    { value: "en", label: "EN" },
    { value: "uk", label: "UA" },
    { value: "ru", label: "RU" },
  ];

  const getLocalization = () => {
    return localization
      ? selectLocalization.find((c) => c.value === localization)
      : "";
  };

  const DropdownIndicator = (props: any) => {
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
    setIsMenuOpened((isMenuOpened) => !isMenuOpened);
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/vacancies?populate=*&filters[categories][categoryTitle][$eq]=${currentCategory}`
      )
      .then((arr) => {
        setSelectedVacancies(arr.data.data);
        console.log(arr.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentCategory]);

  const handleCategorySelect = useCallback((event: any) => {
    setCurrentCategory(event.target.text);
    console.log(currentCategory);
    setActiveMenu("vacancies");
  }, []);

  let isActiveCategory: boolean;

  const handleCategoryMenuSelect = useCallback((event: any) => {
    setCurrentMenuCategory(event.target.name);
  }, []);

  useEffect(() => {
    axios
      .get(
        `${API}/vacancies?populate=*&filters[categories][categoryTitle][$eq]=${currentMenuCategory}`
      )
      .then((arr) => {
        setSelectedMenuVacancies(arr.data.data);
        console.log(arr.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentMenuCategory]);

  return (
    <header id="header" className="Header">
      <NavLink to="/">
        <img src={Logo} alt="logo" className="Header__logo" />
      </NavLink>
      <div className="Header__functionality">
        <nav className="Header__navbar">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link Header__link" : "link Header__link"
            }
            end
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link Header__link" : "link Header__link"
            }
            end
            to="/vacancies"
            onMouseOver={() => setIsDesktopMenuOpened(true)}
            // onMouseLeave={() => setIsDesktopMenuOpened(false)}
          >
            Vacancies
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link Header__link" : "link Header__link"
            }
            end
            to="/about"
          >
            About us
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "active-link Header__link" : "link Header__link"
            }
            end
            to="/videoInterview"
          >
            Video interview
          </NavLink>
        </nav>
        <Select
          classNamePrefix="custom-select-header"
          options={selectLocalization}
          value={getLocalization()}
          onChange={handleLocalizationSelect}
          placeholder={localization}
          components={{
            DropdownIndicator,
          }}
        />

        <button
          type="button"
          onClick={handleMenuClick}
          className="Header__menuButton"
        >
          <div
            className={classNames("Header__menuIcon", {
              Header__menuIcon_active: isMenuOpened,
            })}
          ></div>
        </button>
      </div>

      <div
        className={classNames("Header__dropMenu", {
          Header__dropMenu_active: isMenuOpened,
        })}
      >
        <h4 className="Header__dropMenu_title">Меню</h4>
        <nav className="Header__navbar_mobile">
          <CSSTransition
            in={activeMenu === "main"}
            unmountOnExit
            timeout={500}
            classNames="menu_primary"
          >
            <div className="menu">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active-link Header__link_mobile"
                    : "link Header__link_mobile"
                }
                end
                to="/"
                onClick={() => setIsMenuOpened(false)}
              >
                Home
              </NavLink>
              <a
                className="Header__link_mobile"
                onClick={() => "categories" && setActiveMenu("categories")}
              >
                <span>Vacancies</span>
                <img src={NextIcon} alt="" />
              </a>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active-link Header__link_mobile"
                    : "link Header__link_mobile"
                }
                end
                to="/about"
                onClick={() => setIsMenuOpened(false)}
              >
                <span>About us</span>
                <img src={NextIcon} alt="" />
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active-link Header__link_mobile"
                    : "link Header__link_mobile"
                }
                end
                to="/videoInterview"
                onClick={() => setIsMenuOpened(false)}
              >
                <span>Video interview</span>
                <img src={NextIcon} alt="" />
              </NavLink>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "categories"}
            unmountOnExit
            timeout={500}
            classNames="menu_Secondary"
          >
            <div className="menu">
              <a
                href="#"
                className="Header__link_mobile"
                onClick={() => "main" && setActiveMenu("main")}
              >
                Назад до меню
              </a>
              {categories.map((category) => (
                <a
                  key={category.id}
                  href="#"
                  className="Header__link_mobile"
                  onClick={handleCategorySelect}
                >
                  <span>{category.attributes.categoryTitle}</span>
                  <img src={NextIcon} alt="" />
                </a>
              ))}
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "vacancies"}
            unmountOnExit
            timeout={500}
            classNames="menu_Thirdly"
          >
            <div className="menu">
              <a
                href="#"
                className="Header__link_mobile"
                onClick={() => "categories" && setActiveMenu("categories")}
              >
                Назад до категорій
              </a>

              {selectedVacancies.map((vacancy) => (
                <a
                  key={vacancy.id}
                  href="#"
                  className="Header__link_mobile"
                  onClick={handleCategorySelect}
                >
                  <span>{vacancy.attributes.title}</span>
                  <img src={NextIcon} alt="" />
                </a>
              ))}
            </div>
          </CSSTransition>
        </nav>
      </div>

      <div
        className={classNames("Header__dropMenuDesktop", {
          Header__dropMenuDesktop_active: isDesktopMenuOpened,
        })}
        ref={searchRef}
      >
        <div className="Header__dropMenuDesktop_categories">
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              <input
                type="checkbox"
                checked={
                  currentMenuCategory === category.attributes.categoryTitle
                }
                key={category.id}
                id={category.id}
                name={category.attributes.categoryTitle}
                value={currentMenuCategory}
                onChange={handleCategoryMenuSelect}
                className={classNames("Header__link_desktop")}
              />
              <label className="label" htmlFor={category.id}>
                <span className="label-title">{category.attributes.categoryTitle}</span>
                <img className="label-icon" src={NextIcon} alt="" />
              </label>
            </React.Fragment>
          ))}
        </div>
        <div className="Header__dropMenuDesktop_vacancies">
          {selectedMenuVacancies.map((vacancy) => (
            <a
              key={vacancy.id}
              href="#"
              className="Header__link_desktop--vacancy"
              onClick={handleCategorySelect}
            >
              {vacancy.attributes.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;