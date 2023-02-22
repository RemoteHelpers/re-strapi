/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable function-paren-newline */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import Select, { components } from "react-select";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import "./header.scss";
import "../../global-styles/search.scss";
import LanguageIcon from "@mui/icons-material/Language";
import { useStateContext } from "../../context/StateContext";
import { Category, Vacancy, Collection } from "../../types/types";
// import Logo from "../../images/mainScreen/Logo.png";
import SelectIcon from "../../images/selectArrow.svg";
import useOutsideAlerter from "../../hooks/useClickOutside";
import NextIcon from "../../images/header/nextIcon.svg";
import Loader from "../loader/Loader";
import { HEADER } from "../../database/common/header";
import ChooseLanguageModal from "../chooseLanguageModal";
import { VACANCYLIST } from "../../database/common/vacancyList";
import Find from "../../images/findIcon.svg";
import Close from "../../images/close.svg";

import dev from '../../images/header/categories-icons/developer.png';
import trns from '../../images/header/categories-icons/translation.png';
import management from '../../images/header/categories-icons/management.png';
import marketing from '../../images/header/categories-icons/marketing.png';
import illustrator from '../../images/header/categories-icons/illustrator.png';
import teacher from '../../images/header/categories-icons/teacher.png';

const API = "https://admin.r-ez.com/api";

let searchTime: any;

const Header = () => {
  // eslint-disable-next-line consistent-return
  function chooseImage(id: string | number) {
    switch (id) {
      case 1:
        return (
          <img src={dev} alt="" />
        );
      case 2:
        return (
          <img src={illustrator} alt="" />
        );
      case 4:
        return (
          <img src={marketing} alt="" />
        );
      case 5:
        return (
          <img src={management} alt="" />
        );
      case 6:
        return (
          <img src={trns} alt="" />
        );
      case 7:
        return (
          <img src={teacher} alt="" />
        );
      default:
        return (
          <img src={teacher} alt="" />
        );
    }
  }

  const searchRef = useRef<HTMLDivElement>(null);
  const {
    localization,
    setLocalization,
    isDesktopMenuOpened,
    setIsDesktopMenuOpened,
    setCurrentVacancy,
    headerData,
    setIsOpenModal,
    isSubmitLocalization,
  } = useStateContext();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>();
  const [selectedVacancies, setSelectedVacancies] = useState<Vacancy[]>([]);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [activeMenu, setActiveMenu] = useState("main");
  const [changeLangLoader, setChangeLangLoader] = useState(false);
  const [query, setQuery] = useState<string>("");
  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [searchCollection, setSearchCollection] = useState<Collection[]>([]);
  const [data, setData] = useState<any>();

  const navigate = useNavigate();

  const routingRule = localization === "ru";

  const localizadLinks = HEADER.find((el) => el.language === localization);

  useOutsideAlerter(searchRef, () => {
    setIsDesktopMenuOpened(false);
  });

  useEffect(() => {
    const res = VACANCYLIST.filter((el) => el.language === localization);

    setData(res[0]);
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/categories?locale=${localization === "ua" ? "uk" : localization
        }`
      )
      .then((res) => {
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  useEffect(() => {
    axios
      .get(
        `${API}/vacancies?locale=${localization === "ua" ? "uk" : localization
        }&populate=*`
      )
      .then((res) => {
        setVacancies(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [localization]);

  const selectLocalization = [
    { value: "ua", label: "UA" },
    { value: "pl", label: "PL" },
    { value: "en", label: "EN" },
    { value: "sk", label: "SK" },
    { value: "ru", label: "RU" },
  ];

  const getLocalization = () => {
    return localization
      ? selectLocalization.find((c) => c.value === localization)
      : "";
  };

  useOutsideAlerter(searchRef, () => {
    setIsDropdown(false);
  });

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={SelectIcon} alt="dropdown" />
      </components.DropdownIndicator>
    );
  };

  const handleLocalizationSelect = useCallback(
    (selected: any) => {
      setLocalization(selected.value);
      setChangeLangLoader(true);
      setTimeout(() => {
        setChangeLangLoader(false);
      }, 1000);
    },
    [localization]
  );

  const handleMenuClick = useCallback(() => {
    setIsMenuOpened(!isMenuOpened);
  }, [isMenuOpened]);

  const bodyEl = document.querySelector("body");

  if (isMenuOpened) {
    bodyEl?.classList.add("lock");
  } else {
    bodyEl?.classList.remove("lock");
  }

  const handleCategorySelect = useCallback((event: any) => {
    setCurrentCategory(event.target.text);
    console.log(currentCategory);
    setActiveMenu("vacancies");
  }, []);

  useEffect(() => {
    setSelectedVacancies(
      vacancies.filter(
        (el) =>
          el.attributes.categories.data[0].attributes.categoryTitle ===
          currentCategory
      )
    );
  }, [currentCategory, vacancies]);

  let isActiveCategory: boolean;

  const handleCategoryMenuSelect = useCallback(
    (event: any) => {
      if (currentCategory === event.target.name) {
        setCurrentCategory("");
      } else {
        setCurrentCategory(event.target.name);
      }
    },
    [currentCategory]
  );

  const handleVacancyMenuSelect = useCallback(() => {
    setIsMenuOpened(false);
  }, []);

  const handleDesktopVacancyMenuSelect = useCallback(() => {
    setIsDesktopMenuOpened(false);
  }, []);

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    clearTimeout(searchTime);
    searchTime = setTimeout(async () => {
      const res = await axios.get(
        `${API}/keyword-tags?filters[keyPhrase][$contains]=${event.target.value}`
      );

      setIsDropdown(true);
      setSearchCollection(res?.data?.data || []);
    }, 300);
  };

  const handleClear = useCallback(() => {
    setQuery("");
    setSelectedVacancies([]);
  }, []);

  const onCollection = (collection: Collection) => {
    setQuery(collection.attributes.keyPhrase);
    // setSelectedCollection(collection);
    setIsDropdown(false);
  };

  const onSearchClick = () => {
    setSelectedVacancies(
      vacancies.filter((el) =>
        el.attributes.keyword_tags.data.find(
          (el: any) => el.attributes.keyPhrase === query
        )
      )
    );

    console.log("tessssst");
  };

  document.getElementById("vacancies")?.addEventListener("mouseover", () => {
    setIsDesktopMenuOpened(true);
  });

  useEffect(() => {
    const homeLink = document.querySelector('.Header__link');

    homeLink?.classList.add('active-link');
  }, []);

  return (
    <header id="header" className="Header">
      <NavLink to={routingRule ? "/" : `/${localization}`}>
        {/* <img src={Logo} alt="logo" className="Header__logo" /> */}
        <svg
          className="Header__logo"
          width="277"
          height="87"
          viewBox="0 0 277 87"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect width="277" height="87" fill="url(#pattern0)" />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_2698_123"
                transform="translate(0 -0.00264474) scale(0.000925926 0.00294806)"
              />
            </pattern>
            <image
              id="image0_2698_123"
              width="1080"
              height="341"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
      </NavLink>
      <div className="Header__functionality">
        <nav className="Header__navbar">
          {localizadLinks?.data.map(({ path_id, title }) => (
            <NavLink
              key={path_id}
              className={({ isActive }) =>
                isActive ? "active-link Header__link" : "link Header__link"
              }
              end
              id={path_id}
              to={routingRule ? `/${path_id}` : `/${localization}/${path_id}`}
            >
              {title}
            </NavLink>
          ))}
        </nav>
        {changeLangLoader ? (
          <div className={changeLangLoader ? "darker_bg" : ""}>
            <Loader />
          </div>
        ) : (
          // <Select
          //   classNamePrefix="custom-select-header"
          //   options={selectLocalization}
          //   value={getLocalization()}
          //   onChange={handleLocalizationSelect}
          //   placeholder={localization}
          //   isSearchable={false}
          //   components={{
          //     DropdownIndicator,
          //   }}
          // />
          <button
            className="select-language"
            onClick={() => {
              setIsOpenModal(true);
            }}
          >
            {localization}
            <LanguageIcon />
          </button>
        )}

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
                to={routingRule ? "/" : `/${localization}`}
                onClick={() => setIsMenuOpened(false)}
              >
                {localizadLinks?.data[0].title}
              </NavLink>
              <a
                className="Header__link_mobile"
                onClick={() => "categories" && setActiveMenu("categories")}
              >
                <span> {localizadLinks?.data[1].title}</span>
              </a>
              {/* <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active-link Header__link_mobile"
                    : "link Header__link_mobile"
                }
                end
                to={routingRule ? "/about" : `/${localization}/about`}
                onClick={() => setIsMenuOpened(false)}
              >
                <span> {localizadLinks?.data[1].title}</span>
                <img src={NextIcon} alt="" />
              </NavLink> */}
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active-link Header__link_mobile"
                    : "link Header__link_mobile"
                }
                end
                to={routingRule ? "/about" : `/${localization}/about`}
                onClick={() => setIsMenuOpened(false)}
              >
                <span> {localizadLinks?.data[2].title}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active-link Header__link_mobile"
                    : "link Header__link_mobile"
                }
                end
                to={
                  routingRule
                    ? "/videoInterview"
                    : `/${localization}/videoInterview`
                }
                onClick={() => setIsMenuOpened(false)}
              >
                <span>{localizadLinks?.data[3].title}</span>
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
              <Link
                to={`/${localization}`}
                className="Header__link_mobile Header__link_mobile-back"
                onClick={() => "main" && setActiveMenu("main")}
              >
                <img
                  className="Header__link_mobile-icon"
                  src={NextIcon}
                  alt="Next button"
                />
                <span>{localizadLinks?.backValue}</span>
              </Link>
              <div className="Header__menuTop">
                <div className="Header__search" ref={searchRef}>
                  <div className="search-inner">
                    <div className="search-wrapper">
                      {/* mobile search */}
                      <input
                        type="text"
                        value={query}
                        onChange={searchHandler}
                        placeholder={data?.mobileHeaderPlaceholder}
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
                      {isDropdown && (
                        <div className="search__dropdown">
                          {searchCollection.slice(0, 10).map((collection) => (
                            <button
                              type="button"
                              key={collection.id}
                              onClick={() => onCollection(collection)}
                              className="search__dropdown-row"
                            >
                              {collection.attributes.keyPhrase}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button className="Header__search-button" onClick={onSearchClick}>
                  Search
                </button>
              </div>
              {!query && (
                <Link
                  className="Header__link_mobile"
                  to={routingRule ? "/vacancies" : `/${localization}/vacancies`}
                  onClick={() => setIsMenuOpened(false)}
                >
                  <span> {localizadLinks?.allVacanciesData}</span>
                </Link>
              )}
              {!query && (
                categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/${localization}`}
                    className="Header__link_mobile"
                    onClick={handleCategorySelect}
                  >
                    {chooseImage(category.id as string)}
                    <span>{category.attributes.categoryTitle}</span>
                  </Link>
                ))
              )}
              {query && (
                selectedVacancies.map((vacancy) => (
                  <Link
                    key={vacancy.id}
                    className="Header__link_mobile"
                    to={
                      routingRule
                        ? `/vacancies/${vacancy.attributes.vacancySlug}`
                        : `/${localization}/vacancies/${vacancy.attributes.vacancySlug}`
                    }
                    onClick={() => {
                      setCurrentVacancy(vacancy.attributes.vacancySlug);
                      handleVacancyMenuSelect();
                    }}
                  >
                    <span>{vacancy.attributes.title}</span>
                  </Link>
                ))
              )}
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === "vacancies"}
            unmountOnExit
            timeout={500}
            classNames="menu_Thirdly"
          >
            <div className="menu">
              <Link
                to={`/${localization}`}
                className="Header__link_mobile Header__link_mobile-back"
                onClick={() => "categories" && setActiveMenu("categories")}
              >
                <img
                  className="Header__link_mobile-icon"
                  src={NextIcon}
                  alt="Next button"
                />
                <span>{headerData?.attributes.backValue}</span>
              </Link>

              {selectedVacancies.map((vacancy) => (
                <Link
                  key={vacancy.id}
                  className="Header__link_mobile"
                  to={
                    routingRule
                      ? `/vacancies/${vacancy.attributes.vacancySlug}`
                      : `/${localization}/vacancies/${vacancy.attributes.vacancySlug}`
                  }
                  onClick={() => {
                    setCurrentVacancy(vacancy.attributes.vacancySlug);
                    handleVacancyMenuSelect();
                  }}
                >
                  <span>{vacancy.attributes.title}</span>
                </Link>
              ))}
            </div>
          </CSSTransition>
        </nav>
      </div>

      <div
        className={classNames("Header__dropMenuDesktop", {
          Header__dropMenuDesktop_active: isDesktopMenuOpened,
        })}
        onMouseOver={() => setIsDesktopMenuOpened(true)}
        onMouseLeave={() => setIsDesktopMenuOpened(false)}
        ref={searchRef}
      >
        <div className="Header__menuTop">
          <div className="Header__search" ref={searchRef}>
            <div className="search-inner">
              <div className="search-wrapper">
                <input
                  type="text"
                  value={query}
                  onChange={searchHandler}
                  placeholder={data?.headerPlaceholder}
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
                {isDropdown && (
                  <div className="search__dropdown">
                    {searchCollection.slice(0, 10).map((collection) => (
                      <button
                        type="button"
                        key={collection.id}
                        onClick={() => onCollection(collection)}
                        className="search__dropdown-row"
                      >
                        {collection.attributes.keyPhrase}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button className="Header__search-button" onClick={onSearchClick}>
            Search
          </button>
        </div>
        {query.length === 0 && (
          <div className="Header__dropMenuDesktop_categories">
            {categories.map((category) => (
              <div className="Header__dropMenuDesktop_category_item" key={category.id}>
                <input
                  type="checkbox"
                  checked={
                    currentCategory === category.attributes.categoryTitle
                  }
                  key={category.id}
                  id={category.id}
                  name={category.attributes.categoryTitle}
                  value={currentCategory}
                  onChange={handleCategoryMenuSelect}
                  className={classNames("Header__link_desktop")}
                />
                <label className="label" htmlFor={category.id}>
                  {chooseImage(category.id as string)}
                  <span className="label-title">
                    {category.attributes.categoryTitle}
                  </span>
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="Header__dropMenuDesktop_vacancies">
          {selectedVacancies.map((vacancy) => (
            <Link
              key={vacancy.id}
              className="Header__link_desktop--vacancy"
              to={
                routingRule
                  ? `/vacancies/${vacancy.attributes.vacancySlug}`
                  : `/${localization}/vacancies/${vacancy.attributes.vacancySlug}`
              }
              // onClick={() => setCurrentVacancy(vacancy.attributes.vacancySlug)}
              onClick={() => {
                setCurrentVacancy(vacancy.attributes.vacancySlug);
                handleDesktopVacancyMenuSelect();
              }}
            >
              {vacancy.attributes.title}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
